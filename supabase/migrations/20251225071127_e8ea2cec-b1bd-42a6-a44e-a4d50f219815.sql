-- Workshop Registrations Table
CREATE TABLE public.workshop_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  status TEXT NOT NULL,
  registration_status TEXT DEFAULT 'form_filled',
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  addons_selected JSONB,
  addons_total_price DECIMAL(10,2),
  addons_selected_date TIMESTAMP WITH TIME ZONE,
  payment_status TEXT DEFAULT 'not_paid',
  payment_id TEXT,
  payment_mode TEXT,
  total_amount_paid DECIMAL(10,2),
  payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Course Enrollments Table
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  status TEXT NOT NULL,
  course_name TEXT NOT NULL,
  course_fee DECIMAL(10,2) NOT NULL,
  registration_status TEXT DEFAULT 'form_filled',
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  payment_status TEXT DEFAULT 'not_paid',
  payment_id TEXT,
  payment_mode TEXT,
  total_amount_paid DECIMAL(10,2),
  due_amount DECIMAL(10,2),
  payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

-- Public insert policies (no auth required for registration)
CREATE POLICY "Anyone can insert workshop registrations" 
ON public.workshop_registrations FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert course enrollments" 
ON public.course_enrollments FOR INSERT WITH CHECK (true);

-- Public update policies for payment status updates
CREATE POLICY "Anyone can update workshop registrations" 
ON public.workshop_registrations FOR UPDATE USING (true);

CREATE POLICY "Anyone can update course enrollments" 
ON public.course_enrollments FOR UPDATE USING (true);

-- Public select for retrieving own registration by id
CREATE POLICY "Anyone can view workshop registrations" 
ON public.workshop_registrations FOR SELECT USING (true);

CREATE POLICY "Anyone can view course enrollments" 
ON public.course_enrollments FOR SELECT USING (true);