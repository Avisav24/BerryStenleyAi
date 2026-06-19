// verify-payment
// Client-facing fallback to the webhook. After Razorpay Checkout reports
// success, the browser calls this with the order id. We ask Razorpay directly
// whether the order has a captured payment, then apply the same idempotent,
// amount-checked "mark paid" logic. This gives instant confirmation even if
// the webhook is delayed — it can never override the amount check.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { markOrderPaid } from "../_shared/markPaid.ts";

const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const { orderId } = await req.json();
    if (!orderId || typeof orderId !== "string") {
      return jsonResponse({ error: "Missing orderId" }, 400);
    }

    // Fetch the payments for this order straight from Razorpay (authoritative).
    const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
    const res = await fetch(`https://api.razorpay.com/v1/orders/${orderId}/payments`, {
      headers: { Authorization: `Basic ${auth}` },
    });
    if (!res.ok) {
      throw new Error(`Razorpay lookup failed: ${res.status}`);
    }
    const { items } = await res.json();
    const captured = (items ?? []).find((p: { status: string }) => p.status === "captured");

    if (!captured) {
      // Not captured yet — let the webhook finish it; tell the client to wait.
      return jsonResponse({ status: "pending" });
    }

    const result = await markOrderPaid(admin, {
      orderId,
      paymentId: captured.id,
      amountPaise: Number(captured.amount),
      method: captured.method,
    });

    if (!result.ok && result.reason === "amount_mismatch") {
      return jsonResponse({ status: "error", error: "Amount mismatch" }, 409);
    }
    if (!result.ok) {
      return jsonResponse({ status: "pending" });
    }
    return jsonResponse({ status: "paid" });
  } catch (err) {
    console.error("verify-payment error:", err);
    return jsonResponse({ error: "Verification failed" }, 500);
  }
});
