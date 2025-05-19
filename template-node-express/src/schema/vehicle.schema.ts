// src/schema/vehicle.schema.ts
import { z } from 'zod';

export const createVehicleSchema = z.object({
  plateNumber: z
    .string()
    .min(3, 'Plate number must be at least 3 characters')
    .max(20, 'Plate number must be less than 20 characters')
    .regex(/^[A-Z0-9-]+$/, 'Plate number must contain only uppercase letters, numbers, or hyphens'),
  type: z.enum(['CAR', 'MOTORCYCLE', 'TRUCK', 'ELECTRIC'], {
    errorMap: () => ({ message: 'Invalid vehicle type' }),
  }),
});

export const updateVehicleSchema = z.object({
  plateNumber: z
    .string()
    .length(6, 'Plate number must be 6 characters')
    .regex(/^[A-Z0-9-]+$/, 'Plate number must contain only uppercase letters, numbers, or hyphens')
    .optional(),
  type: z.enum(['CAR', 'MOTORCYCLE', 'TRUCK', 'ELECTRIC'], {
    errorMap: () => ({ message: 'Invalid vehicle type' }),
  }).optional(),
});

export const validateCreateVehicleInput = (data: unknown) => {
  const result = createVehicleSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      result.error.errors.map((err) => err.message).join(', ')
    );
  }
  return result.data;
};

export const validateUpdateVehicleInput = (data: unknown) => {
  const result = updateVehicleSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      result.error.errors.map((err) => err.message).join(', ')
    );
  }
  return result.data;
};