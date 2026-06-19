// register
// The single server-side entry point for creating a registration. Performs
// validation, per-IP rate limiting, and inserts the row with the service role
// (the public INSERT policies have been removed). Returns the new row id, which
// the client then passes to create-order.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Rate limit: max attempts per IP within the rolling window.
const WINDOW_MINUTES = 10;
const MAX_ATTEMPTS = 5;

const NAME_RE = /^[a-zA-Z\s.'-]+$/;
const MOBILE_RE = /^[0-9+\-\s()]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = { value: unknown; max: number; re?: RegExp; label: string };

function validate(fields: Record<string, Field>): string | null {
  for (const [, f] of Object.entries(fields)) {
    const v = typeof f.value === "string" ? f.value.trim() : "";
    if (!v) return `${f.label} is required`;
    if (v.length > f.max) return `${f.label} is too long`;
    if (f.re && !f.re.test(v)) return `${f.label} is invalid`;
  }
  return null;
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") ?? "unknown";
}

async function rateLimited(ip: string, action: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
  const { count } = await admin
    .from("registration_attempts")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .eq("action", action)
    .gte("created_at", since);
  return (count ?? 0) >= MAX_ATTEMPTS;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const { type } = body;
    if (type !== "course" && type !== "workshop") {
      return jsonResponse({ error: "Invalid type" }, 400);
    }

    const ip = clientIp(req);
    if (await rateLimited(ip, type)) {
      return jsonResponse(
        { error: "Too many attempts. Please wait a few minutes and try again." },
        429,
      );
    }

    // Shared contact fields.
    const contactError = validate({
      name: { value: body.name, max: 100, re: NAME_RE, label: "Name" },
      mobile: { value: body.mobile, max: 15, re: MOBILE_RE, label: "Mobile number" },
      email: { value: body.email, max: 255, re: EMAIL_RE, label: "Email" },
      city: { value: body.city, max: 100, re: NAME_RE, label: "City" },
      state: { value: body.state, max: 100, re: NAME_RE, label: "State" },
      country: { value: body.country, max: 100, label: "Country" },
      status: { value: body.status, max: 100, label: "Status" },
    });
    if (contactError) return jsonResponse({ error: contactError }, 400);

    const common = {
      name: String(body.name).trim(),
      mobile: String(body.mobile).trim(),
      email: String(body.email).trim(),
      city: String(body.city).trim(),
      state: String(body.state).trim(),
      country: String(body.country).trim(),
      status: String(body.status).trim(),
      registration_status: "form_filled",
      registration_date: new Date().toISOString(),
    };

    let registrationId: string;

    if (type === "course") {
      // Resolve authoritative course fee for the NOT NULL columns. The exact
      // amount charged is (re)computed again in create-order.
      const { data: course, error: courseErr } = await admin
        .from("courses")
        .select("title, discounted_fee, is_active")
        .eq("id", body.courseId)
        .single();
      if (courseErr || !course || !course.is_active) {
        return jsonResponse({ error: "Course not found" }, 404);
      }

      const { data, error } = await admin
        .from("course_enrollments")
        .insert({
          ...common,
          course_name: course.title,
          course_fee: course.discounted_fee,
          due_amount: course.discounted_fee,
        })
        .select("id")
        .single();
      if (error) throw error;
      registrationId = data.id;
    } else {
      const { data, error } = await admin
        .from("workshop_registrations")
        .insert({ ...common })
        .select("id")
        .single();
      if (error) throw error;
      registrationId = data.id;
    }

    await admin.from("registration_attempts").insert({ ip, action: type });

    return jsonResponse({ registrationId });
  } catch (err) {
    console.error("register error:", err);
    return jsonResponse({ error: "Failed to register" }, 500);
  }
});
