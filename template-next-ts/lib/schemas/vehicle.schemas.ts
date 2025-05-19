import { z } from "zod";

export const vehicleTypes = ["CAR", "MOTORCYCLE", "TRUCK", "ELECTRIC"] as const;
export type VehicleType = typeof vehicleTypes[number];

export const vehicleSchema = z.object({
  plateNumber: z
    .string()
    .length(6, 'Plate number must be 6 characters')
    .regex(/^[A-Z0-9-]+$/, 'Plate number must contain only uppercase letters, numbers, or hyphens'),
  type: z.enum(vehicleTypes, {
    errorMap: () => ({ message: 'Invalid vehicle type' }),
  }),
});

export type CreateVehicleFormData = z.infer<typeof vehicleSchema>;
export type UpdateVehicleFormData = z.infer<typeof vehicleSchema>;