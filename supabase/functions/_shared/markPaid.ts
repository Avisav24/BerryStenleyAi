// Shared "mark a registration paid" logic, used by both the Razorpay webhook
// and the verify-payment fallback. Idempotent and amount-checked, so calling it
// twice (webhook + client return) is safe.
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

export type MarkPaidResult =
  | { ok: true; status: "paid" | "already_paid" }
  | { ok: false; reason: "not_found" | "amount_mismatch" | "error" };

export async function markOrderPaid(
  admin: SupabaseClient,
  params: { orderId: string; paymentId: string; amountPaise: number; method?: string },
): Promise<MarkPaidResult> {
  const { orderId, paymentId, amountPaise, method } = params;
  const tables = ["workshop_registrations", "course_enrollments"] as const;

  for (const table of tables) {
    const { data: row } = await admin
      .from(table)
      .select("id, expected_amount, payment_status")
      .eq("razorpay_order_id", orderId)
      .maybeSingle();
    if (!row) continue;

    if (row.payment_status === "paid") return { ok: true, status: "already_paid" };

    const expectedPaise = Math.round(Number(row.expected_amount) * 100);
    if (expectedPaise !== amountPaise) {
      console.error(
        `markOrderPaid: amount mismatch ${table} ${row.id}: expected ${expectedPaise}, got ${amountPaise}`,
      );
      return { ok: false, reason: "amount_mismatch" };
    }

    const { error } = await admin
      .from(table)
      .update({
        payment_status: "paid",
        payment_id: paymentId,
        payment_mode: method ?? "online",
        total_amount_paid: amountPaise / 100,
        payment_date: new Date().toISOString(),
        registration_status: "completed",
      })
      .eq("id", row.id)
      .eq("payment_status", "not_paid");
    if (error) {
      console.error("markOrderPaid: update failed", error);
      return { ok: false, reason: "error" };
    }
    return { ok: true, status: "paid" };
  }

  return { ok: false, reason: "not_found" };
}
