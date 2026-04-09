import { z } from "zod";

export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,6}[-\s\.]?[0-9]{1,6}$/,
    "Please enter a valid phone number"
  );

export const ethiopianPhoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(/^(\+251|0)[9]\d{8}$/, "Please enter a valid Ethiopian phone number (09XXXXXXXX or +2519XXXXXXXX)");