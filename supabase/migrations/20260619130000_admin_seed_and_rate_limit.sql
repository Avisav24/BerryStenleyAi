-- =====================================================================
-- 1. Admin role seeding
-- 2. Per-IP rate limiting for registrations
-- 3. Close the open INSERT policies (registrations now go through the
--    `register` Edge Function, which inserts with the service role)
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Admin role
-- ---------------------------------------------------------------------

-- Re-runnable helper: grant admin to an existing auth user by email.
-- Use after the admin has signed up:  SELECT public.promote_to_admin('x@y.com');
CREATE OR REPLACE FUNCTION public.promote_to_admin(_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid;
BEGIN
  SELECT id INTO _uid FROM auth.users WHERE email = _email;
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'No auth user with email %', _email;
  END IF;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_uid, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.promote_to_admin(TEXT) FROM PUBLIC, anon, authenticated;

-- Seed the known admin if they have already signed up. If the auth user
-- does not exist yet, this is a no-op — run promote_to_admin() after signup.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users
WHERE email = 'aiacademy.berrystenley@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- ---------------------------------------------------------------------
-- 2. Rate-limit ledger (written/read only by the service role)
-- ---------------------------------------------------------------------

CREATE TABLE public.registration_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX registration_attempts_ip_time_idx
  ON public.registration_attempts (ip, created_at DESC);

-- RLS on with no policies => no anon/authenticated access. The service role
-- (Edge Functions) bypasses RLS and is the only thing that touches this table.
ALTER TABLE public.registration_attempts ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------
-- 3. Close the public INSERT policies
--    All registration writes now flow through the `register` Edge Function.
-- ---------------------------------------------------------------------

DROP POLICY IF EXISTS "Anyone can insert workshop registrations" ON public.workshop_registrations;
DROP POLICY IF EXISTS "Anyone can insert course enrollments"     ON public.course_enrollments;
