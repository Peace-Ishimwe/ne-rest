// src/controllers/vehicle.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../database/prisma';
import { ApiResponse } from '../utils/response';
import { validateCreateVehicleInput, validateUpdateVehicleInput } from '../schema/vehicle.schema';

/**
 * Create a new vehicle
 */
export const createVehicle = async (req: Request, res: Response) => {
    try {
        const validated = validateCreateVehicleInput(req.body);
        const { plateNumber, type } = validated;

        // @ts-ignore - from auth middleware
        const userId = req.user.id;

        const existing = await prisma.vehicle.findUnique({ where: { plateNumber } });
        if (existing) {
            return ApiResponse.error(res, 400, 'Vehicle with this plate number already exists');
        }

        const vehicle = await prisma.vehicle.create({
            data: {
                plateNumber,
                type,
                ownerId: userId
            }
        });

        return ApiResponse.success(res, 201, 'Vehicle added successfully', { vehicle });
    } catch (error) {
        // Handle validation errors
        if (error instanceof Error && (error.message.includes('Invalid') || error.message.includes('required'))) {
            return res.status(400).json({ message: error.message });
        }
        // Handle other errors
        return ApiResponse.serverError(res, error);
    }
};

/**
 * Get all vehicles for the logged-in user
 */
export const getMyVehicles = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;

        const vehicles = await prisma.vehicle.findMany({
            where: { ownerId: userId }
        });

        return ApiResponse.success(res, 200, 'Vehicles retrieved successfully', vehicles);
    } catch (error) {
        return ApiResponse.serverError(res, error);
    }
};

/**
 * Update a vehicle
 */
export const updateVehicle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validated = validateUpdateVehicleInput(req.body);
        const { plateNumber, type } = validated;

        // @ts-ignore
        const userId = req.user.id;

        const existing = await prisma.vehicle.findUnique({
            where: { id }
        });

        if (!existing || existing.ownerId !== userId) {
            return ApiResponse.error(res, 404, 'Vehicle not found or unauthorized');
        }

        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data: { plateNumber, type }
        });

        return ApiResponse.success(res, 200, 'Vehicle updated successfully', { vehicle: updatedVehicle });
    } catch (error) {
        // Handle validation errors
        if (error instanceof Error && (error.message.includes('Invalid') || error.message.includes('required'))) {
            return res.status(400).json({ message: error.message });
        }
        // Handle other errors
        return ApiResponse.serverError(res, error);
    }
};

/**
 * Delete a vehicle
 */
export const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // @ts-ignore
        const userId = req.user.id;

        const existing = await prisma.vehicle.findUnique({
            where: { id }
        });

        if (!existing || existing.ownerId !== userId) {
            return ApiResponse.error(res, 404, 'Vehicle not found or unauthorized');
        }

        await prisma.vehicle.delete({ where: { id } });

        return ApiResponse.success(res, 200, 'Vehicle deleted successfully');
    } catch (error) {
        return ApiResponse.serverError(res, error);
    }
};