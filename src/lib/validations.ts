import { z } from "zod";

// Workshop Registration Schema
export const workshopRegistrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: "Name can only contain letters, spaces, dots, hyphens and apostrophes" }),
  mobile: z
    .string()
    .trim()
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(15, { message: "Mobile number must be less than 15 digits" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Invalid mobile number format" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  city: z
    .string()
    .trim()
    .min(1, { message: "City is required" })
    .max(100, { message: "City must be less than 100 characters" })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: "City can only contain letters and spaces" }),
  state: z
    .string()
    .trim()
    .min(1, { message: "State is required" })
    .max(100, { message: "State must be less than 100 characters" })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: "State can only contain letters and spaces" }),
  country: z
    .string()
    .trim()
    .min(1, { message: "Country is required" })
    .max(100, { message: "Country must be less than 100 characters" }),
  status: z
    .string()
    .min(1, { message: "Please select your current status" }),
});

// Course Registration Schema
export const courseRegistrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: "Name can only contain letters, spaces, dots, hyphens and apostrophes" }),
  mobile: z
    .string()
    .trim()
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(15, { message: "Mobile number must be less than 15 digits" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Invalid mobile number format" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  city: z
    .string()
    .trim()
    .min(1, { message: "City is required" })
    .max(100, { message: "City must be less than 100 characters" })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: "City can only contain letters and spaces" }),
  state: z
    .string()
    .trim()
    .min(1, { message: "State is required" })
    .max(100, { message: "State must be less than 100 characters" })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: "State can only contain letters and spaces" }),
  country: z
    .string()
    .trim()
    .min(1, { message: "Country is required" })
    .max(100, { message: "Country must be less than 100 characters" })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: "Country can only contain letters and spaces" }),
  status: z
    .string()
    .min(1, { message: "Please select your current status" }),
  courseId: z
    .string()
    .min(1, { message: "Please select a course" }),
});

export type WorkshopRegistrationData = z.infer<typeof workshopRegistrationSchema>;
export type CourseRegistrationData = z.infer<typeof courseRegistrationSchema>;
