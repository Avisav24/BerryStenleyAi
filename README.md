# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/05d85a26-4507-40f8-8042-3795e0c19c85

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/05d85a26-4507-40f8-8042-3795e0c19c85) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Postgres, Auth, Edge Functions) as the backend
- Razorpay for payments

---

## Backend & Payments

The site is a marketing/registration front end for **Berry Stenley AI Academy** (workshops + courses). All backend logic runs on **Supabase**: Postgres tables with Row Level Security, plus Deno **Edge Functions** for anything privileged. The browser never decides prices and never marks a payment as paid.

### Payment flow (secure)

```
Form submit ──► register (Edge Fn)            validate + per-IP rate limit, insert row (service role)
            ──► create-order (Edge Fn)         recompute amount from DB pricing, create Razorpay order
            ──► Razorpay Checkout (browser)     user pays
            ──► razorpay-webhook (Edge Fn)      HMAC-verified; the ONLY writer of payment_status='paid'
            ──► verify-payment (Edge Fn)        client-return fallback; queries Razorpay directly
```

Key guarantees:
- **Pricing is server-side.** Course/add-on/workshop prices live in DB tables; `create-order` recomputes the charge and stores an `expected_amount`. The client-sent amount is ignored.
- **Payment confirmation is server-side only.** Only `razorpay-webhook` (signature-verified) and `verify-payment` (queries Razorpay) can set `payment_status='paid'`, and only if the captured amount equals `expected_amount`. The mark-paid logic is shared and idempotent.
- **Registrations are gated.** The public `INSERT` policies were removed; all writes go through the `register` function, which validates input and rate-limits by IP (5 attempts / 10 min).
- **Data is private.** The previous "anyone can read/update" RLS policies were dropped. Reads are admin-only; payment/order columns are written only by the service role.

### Edge Functions (`supabase/functions/`)

| Function | Auth | Purpose |
|----------|------|---------|
| `register` | anon | Server-side validation + per-IP rate limit, inserts the registration via service role |
| `create-order` | anon | Recomputes amount from DB pricing, creates the Razorpay order, stores `expected_amount` + `razorpay_order_id` |
| `razorpay-webhook` | HMAC signature | Razorpay → server. Sole writer of `payment_status='paid'`, amount-checked + idempotent |
| `verify-payment` | anon | Browser-return fallback; asks Razorpay directly whether the order was captured |
| `_shared/` | – | `cors.ts`, `markPaid.ts` (shared mark-paid logic used by webhook + verify) |

### Database schema (`supabase/migrations/`)

- `..._secure_payments.sql`
  - `courses`, `addons`, `app_settings` — authoritative, public read-only pricing (seeded from the catalog).
  - Order columns on registration tables: `razorpay_order_id`, `expected_amount` (+ `payment_option` for courses), with unique indexes.
  - RLS lockdown: dropped the open SELECT/UPDATE policies; reads are admin-only.
- `..._admin_seed_and_rate_limit.sql`
  - `promote_to_admin(email)` helper + seeds the admin user role.
  - `registration_attempts` table for IP rate limiting.
  - Dropped the public `INSERT` policies (writes now go through `register`).

### Setup / deployment

1. **Environment** — `.env` holds the public client values:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_PUBLISHABLE_KEY=...   # anon key (safe in the browser)
   ```
   Never put the service-role key in the client.

2. **Apply migrations & deploy functions:**
   ```sh
   supabase db push
   supabase functions deploy register create-order verify-payment razorpay-webhook
   ```

3. **Set function secrets** (server-side only):
   ```sh
   supabase secrets set \
     RAZORPAY_KEY_ID=... \
     RAZORPAY_KEY_SECRET=... \
     RAZORPAY_WEBHOOK_SECRET=...
   ```

4. **Register the webhook** in the Razorpay dashboard:
   `https://<project-ref>.supabase.co/functions/v1/razorpay-webhook`, event **`payment.captured`**, using the same `RAZORPAY_WEBHOOK_SECRET`.

5. **Grant admin access** (after the admin account has signed up at `/admin`):
   ```sql
   SELECT public.promote_to_admin('aiacademy.berrystenley@gmail.com');
   ```

> Note: `register` derives the client IP from `x-forwarded-for`. If you front Supabase with an additional proxy, verify that header still reflects the real client IP.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/05d85a26-4507-40f8-8042-3795e0c19c85) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
