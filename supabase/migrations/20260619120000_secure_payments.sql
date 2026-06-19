-- =====================================================================
-- Secure payments migration
--   1. Authoritative server-side pricing (courses, addons, app_settings)
--   2. Order-tracking columns on the registration tables
--   3. RLS lockdown: clients may INSERT registrations but may NOT read
--      other people's rows or write payment/order columns. All payment
--      state is written exclusively by the service role (Edge Functions).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Pricing tables (single source of truth for UI and server)
-- ---------------------------------------------------------------------

-- Courses: ids are text to match the existing client catalog ("student-1", ...)
CREATE TABLE public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  benefit TEXT NOT NULL,
  original_fee INTEGER NOT NULL CHECK (original_fee >= 0),
  discounted_fee INTEGER NOT NULL CHECK (discounted_fee >= 0),
  certification TEXT NOT NULL,
  certification_color TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.addons (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  original_price INTEGER NOT NULL CHECK (original_price >= 0),
  offer_price INTEGER NOT NULL CHECK (offer_price >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Simple key/value config (workshop base fee, currency, etc.)
CREATE TABLE public.app_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.app_settings (key, value) VALUES
  ('workshop_fee', '99'::jsonb),
  ('currency', '"INR"'::jsonb);

-- Seed courses (mirrors src/components/CourseRegistrationPopup.tsx)
INSERT INTO public.courses (id, title, duration, benefit, original_fee, discounted_fee, certification, certification_color, sort_order) VALUES
  ('student-1', 'AI for Smart Study & Exam Preparation', '1 Week', 'Smart AI tools for study & exam preparation', 55500, 19999, 'Silver Certification', 'bg-gray-400', 1),
  ('student-2', 'AI for Productivity, Research & Learning Excellence', '1 Month', 'Use AI for productivity, skill-focused research & learning', 135500, 98999, 'Gold Certification', 'bg-yellow-500', 2),
  ('student-3', 'Future-Proof AI Mastery for Competitive Exams', '6 Months', 'Future-proof AI knowledge & competitive exam mastery', 263500, 190999, 'Platinum Certification', 'bg-purple-500', 3),
  ('pro-1', 'AI for Professional Tasks', '1 Week', 'Use AI for daily professional tasks', 86500, 29999, 'Silver Certification', 'bg-gray-400', 4),
  ('pro-2', 'AI Implementation Expert', '1 Month', 'Become an AI implementation expert for real-world tasks', 135999, 98999, 'Gold Certification', 'bg-yellow-500', 5),
  ('pro-3', 'Full-Stack AI Professional', '6 Months', 'Master AI tools, workflows & automation', 263500, 190999, 'Platinum Certification', 'bg-purple-500', 6),
  ('pro-4', 'AI Expertise with Machine Learning', '1 Year', 'Advanced AI & ML applied expertise', 485999, 385999, 'Diamond Certification', 'bg-cyan-400', 7),
  ('pro-5', 'Complete AI + Industry Leadership Program', '2 Years', 'Complete AI mastery with industry training', 752999, 649999, 'Crown Certification', 'bg-amber-600', 8),
  ('fast-track', 'Fast-Track Professional AI Mastery', '1 Month (Fast-Paced)', 'Intensive AI upskilling for working professionals', 487500, 349999, 'Diamond Crown Certification', 'bg-gradient-to-r from-cyan-400 to-amber-500', 9);

-- Seed addons (mirrors src/components/RegistrationPopup.tsx)
INSERT INTO public.addons (id, name, original_price, offer_price) VALUES
  (1, 'E-book on AI Mastery Fundamentals by Prof. Brajesh Kumar', 28999, 249),
  (2, 'E-book on Prompt Engineering', 35450, 199),
  (3, 'Pack of 60 Best AI Toolkits', 10990, 99),
  (4, '200 Ready AI Prompts + 200 Project Blueprints', 79999, 299),
  (5, 'Gold-Level Workshop Certificate (Industry Certification)', 15990, 149),
  (6, 'E-book on AI Monetization Mastery', 150000, 249),
  (7, 'Internship Support + Certification', 19990, 199),
  (8, 'AI Startup Launch Package', 99990, 399),
  (9, 'Personal AI Career Roadmap & Salary Growth Consultation', 49990, 299),
  (10, 'AI Business Automation Package (for Entrepreneurs)', 149990, 499),
  (11, 'Competitive Exam AI Tools', 599, 99),
  (12, 'Lifetime VIP membership in Hi-Tech AI community', 45899, 1999),
  (13, 'AI Video Creation Suite', 58999, 899);

ALTER TABLE public.courses     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addons      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Pricing is public read-only (used to render the catalog). No public writes.
CREATE POLICY "Anyone can view active courses"
  ON public.courses FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active addons"
  ON public.addons FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view app settings"
  ON public.app_settings FOR SELECT USING (true);

-- Admins manage pricing.
CREATE POLICY "Admins manage courses"
  ON public.courses FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage addons"
  ON public.addons FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage app settings"
  ON public.app_settings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------
-- 2. Order-tracking columns
-- ---------------------------------------------------------------------

ALTER TABLE public.workshop_registrations
  ADD COLUMN razorpay_order_id TEXT,
  ADD COLUMN expected_amount   DECIMAL(10,2);

ALTER TABLE public.course_enrollments
  ADD COLUMN razorpay_order_id TEXT,
  ADD COLUMN expected_amount   DECIMAL(10,2),
  ADD COLUMN payment_option    TEXT;

-- Order id is the lookup key for the webhook; must be unique once set.
CREATE UNIQUE INDEX workshop_registrations_order_id_idx
  ON public.workshop_registrations (razorpay_order_id)
  WHERE razorpay_order_id IS NOT NULL;
CREATE UNIQUE INDEX course_enrollments_order_id_idx
  ON public.course_enrollments (razorpay_order_id)
  WHERE razorpay_order_id IS NOT NULL;

-- Helpful lookups for the admin dashboard.
CREATE INDEX workshop_registrations_created_at_idx ON public.workshop_registrations (created_at DESC);
CREATE INDEX course_enrollments_created_at_idx     ON public.course_enrollments (created_at DESC);

-- ---------------------------------------------------------------------
-- 3. RLS lockdown
--    Drop the wide-open SELECT/UPDATE policies created in the first
--    migration. Clients keep INSERT only. The service role (used by Edge
--    Functions) bypasses RLS, so create-order / webhook can still write.
-- ---------------------------------------------------------------------

DROP POLICY IF EXISTS "Anyone can update workshop registrations" ON public.workshop_registrations;
DROP POLICY IF EXISTS "Anyone can update course enrollments"     ON public.course_enrollments;
DROP POLICY IF EXISTS "Anyone can view workshop registrations"   ON public.workshop_registrations;
DROP POLICY IF EXISTS "Anyone can view course enrollments"       ON public.course_enrollments;

-- INSERT policies from the first migration remain in place so the public
-- registration forms keep working. The admin SELECT policies from the
-- second migration remain the only way to read these tables.
