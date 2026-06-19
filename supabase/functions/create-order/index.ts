// create-order
// Recomputes the amount due from the authoritative pricing tables (never
// trusting client-sent prices), creates a Razorpay order, records the
// expected amount + order id on the registration row, and returns the order
// details needed to open Razorpay Checkout.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";

const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Service-role client bypasses RLS so we can read pricing and write the
// payment/order columns the public client is no longer allowed to touch.
const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function getWorkshopFee(): Promise<number> {
  const { data } = await admin
    .from("app_settings")
    .select("value")
    .eq("key", "workshop_fee")
    .single();
  return Number(data?.value ?? 99);
}

async function createRazorpayOrder(amountInr: number, receipt: string, notes: Record<string, string>) {
  const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amountInr * 100), // paise
      currency: "INR",
      receipt,
      notes,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Razorpay order creation failed: ${res.status} ${text}`);
  }
  return await res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const { type, registrationId } = body;

    if (!registrationId || (type !== "course" && type !== "workshop")) {
      return jsonResponse({ error: "Invalid request" }, 400);
    }

    // ---------------- COURSE ----------------
    if (type === "course") {
      const { courseId, paymentOption } = body;
      if (!["20", "50", "100"].includes(String(paymentOption))) {
        return jsonResponse({ error: "Invalid payment option" }, 400);
      }

      const { data: course, error: courseErr } = await admin
        .from("courses")
        .select("id, title, discounted_fee, is_active")
        .eq("id", courseId)
        .single();
      if (courseErr || !course || !course.is_active) {
        return jsonResponse({ error: "Course not found" }, 404);
      }

      const courseFee = course.discounted_fee;
      const pct = Number(paymentOption);
      const payNow = Math.round((courseFee * pct) / 100);
      const dueAmount = courseFee - payNow;

      const order = await createRazorpayOrder(payNow, `course_${registrationId}`.slice(0, 40), {
        type: "course",
        registration_id: registrationId,
        course_id: course.id,
      });

      // Authoritatively overwrite the amount fields the client wrote at insert.
      const { error: updErr } = await admin
        .from("course_enrollments")
        .update({
          course_name: course.title,
          course_fee: courseFee,
          payment_option: paymentOption,
          due_amount: dueAmount,
          expected_amount: payNow,
          razorpay_order_id: order.id,
          payment_status: "not_paid",
        })
        .eq("id", registrationId);
      if (updErr) throw updErr;

      return jsonResponse({
        orderId: order.id,
        amount: order.amount, // paise
        currency: order.currency,
        keyId: RAZORPAY_KEY_ID,
        payNow,
        dueAmount,
      });
    }

    // ---------------- WORKSHOP ----------------
    const addonIds: number[] = Array.isArray(body.addonIds)
      ? body.addonIds.map((n: unknown) => Number(n)).filter(Number.isFinite)
      : [];

    const workshopFee = await getWorkshopFee();

    let addonsTotal = 0;
    let selectedAddons: { name: string; price: number }[] = [];
    if (addonIds.length > 0) {
      const { data: addons, error: addonsErr } = await admin
        .from("addons")
        .select("id, name, offer_price")
        .in("id", addonIds)
        .eq("is_active", true);
      if (addonsErr) throw addonsErr;
      selectedAddons = (addons ?? []).map((a) => ({ name: a.name, price: a.offer_price }));
      addonsTotal = (addons ?? []).reduce((sum, a) => sum + a.offer_price, 0);
    }

    const total = workshopFee + addonsTotal;

    const order = await createRazorpayOrder(total, `wshop_${registrationId}`.slice(0, 40), {
      type: "workshop",
      registration_id: registrationId,
    });

    const { error: updErr } = await admin
      .from("workshop_registrations")
      .update({
        addons_selected: selectedAddons,
        addons_total_price: addonsTotal,
        addons_selected_date: new Date().toISOString(),
        registration_status: "addons_selected",
        expected_amount: total,
        razorpay_order_id: order.id,
        payment_status: "not_paid",
      })
      .eq("id", registrationId);
    if (updErr) throw updErr;

    return jsonResponse({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
      workshopFee,
      addonsTotal,
      total,
    });
  } catch (err) {
    console.error("create-order error:", err);
    return jsonResponse({ error: "Failed to create order" }, 500);
  }
});
