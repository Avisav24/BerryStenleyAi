// razorpay-webhook
// The ONLY code permitted to set payment_status = 'paid'. Razorpay calls this
// endpoint server-to-server. We verify the HMAC signature against the raw
// body, then mark the matching registration paid — but only if the captured
// amount equals the expected amount we stored when the order was created.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { markOrderPaid } from "../_shared/markPaid.ts";

const WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Constant-time-ish hex HMAC-SHA256 of the raw payload.
async function expectedSignature(rawBody: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Read the RAW body — signature is computed over the exact bytes sent.
  const rawBody = await req.text();
  const received = req.headers.get("x-razorpay-signature") ?? "";
  const expected = await expectedSignature(rawBody);

  if (!received || !timingSafeEqual(received, expected)) {
    console.warn("razorpay-webhook: invalid signature");
    return new Response("Invalid signature", { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Bad payload", { status: 400 });
  }

  // We only act on a captured payment. Ack everything else with 200 so
  // Razorpay does not retry events we intentionally ignore.
  if (event.event !== "payment.captured") {
    return new Response("ignored", { status: 200 });
  }

  const payment = event.payload?.payment?.entity;
  const orderId = payment?.order_id;
  const paymentId = payment?.id;
  const amountPaise = Number(payment?.amount);

  if (!orderId || !paymentId || !Number.isFinite(amountPaise)) {
    return new Response("Incomplete payment entity", { status: 400 });
  }

  const result = await markOrderPaid(admin, {
    orderId,
    paymentId,
    amountPaise,
    method: payment.method,
  });

  if (!result.ok && result.reason === "amount_mismatch") {
    return new Response("Amount mismatch", { status: 409 });
  }
  if (!result.ok && result.reason === "error") {
    return new Response("Update failed", { status: 500 });
  }
  // not_found / paid / already_paid all ack with 200 so Razorpay stops retrying.
  if (!result.ok) {
    console.warn(`razorpay-webhook: no registration for order ${orderId}`);
  }
  return new Response("ok", { status: 200 });
});
