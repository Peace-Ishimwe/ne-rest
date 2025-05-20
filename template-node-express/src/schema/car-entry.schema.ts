import { z } from "zod";

export const createCarEntrySchema = z.object({
  plateNumber: z
    .string()
    .min(3, "Plate number must be at least 3 characters")
    .max(20, "Plate number must be less than 20 characters")
    .regex(/^[A-Z0-9-]+$/, "Plate number must contain only uppercase letters, numbers, or hyphens"),
  parkingCode: z
    .string()
    .uuid("Parking code must be a valid UUID"),
});

export const updateCarEntrySchema = z.object({
  exitDateTime: z.string().datetime().optional(),
  chargedAmount: z.number().min(0, "Charged amount cannot be negative").optional(),
});

export const validateCreateCarEntryInput = (data: unknown) => {
  const result = createCarEntrySchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      result.error.errors.map((err) => err.message).join(", ")
    );
  }
  return result.data;
};

export const validateUpdateCarEntryInput = (data: unknown) => {
  const result = updateCarEntrySchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      result.error.errors.map((err) => err.message).join(", ")
    );
  }
  return result.data;
};