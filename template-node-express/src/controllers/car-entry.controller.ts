import { Request, Response } from 'express';
import { prisma } from '../database/prisma';
import { ApiResponse } from '../utils/response';
import {
  validateCreateCarEntryInput,
  validateUpdateCarEntryInput,
} from '../schema/car-entry.schema';

export const createCarEntry = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - from auth middleware
    const { role } = req.user;

    if (role !== 'Admin' && role !== 'ParkingAttendant') {
      return ApiResponse.error(
        res,
        403,
        'Only admins and parking attendants can register car entries',
      );
    }

    const validated = validateCreateCarEntryInput(req.body);
    const { plateNumber, parkingCode} = validated;

    const parking = await prisma.parking.findUnique({
      where: { id: parkingCode},
    });

    if (!parking) {
      return ApiResponse.error(res, 404, 'Parking lot not found');
    }

    if (parking.numberOfAvailableSpaces <= 0) {
      return ApiResponse.error(res, 400, 'No available spaces in the parking lot');
    }

  const carEntry = await prisma.$transaction(async (tx) => {
  const entry = await tx.carEntry.create({
    data: {
      plateNumber,
      parkingCode, 
      entryDateTime: new Date(),
      exitDateTime: null,
      chargedAmount: 0,
      parkingId: parkingCode
    },
  });

  await tx.parking.update({
    where: { id: parkingCode},
    data: { numberOfAvailableSpaces: { decrement: 1 } },
  });

  return entry;
});

    return ApiResponse.success(res, 201, 'Car entry registered successfully', { carEntry });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes('Invalid') || error.message.includes('required'))
    ) {
      return res.status(400).json({ message: error.message });
    }
    return ApiResponse.serverError(res, error);
  }
};
export const updateCarExit = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - from auth middleware
    const { id: userId, role } = req.user;

    if (role !== 'Admin' && role !== 'ParkingAttendant') {
      return ApiResponse.error(res, 403, 'Only admins and parking attendants can update car exits');
    }

    const { id } = req.params;
    const validated = validateUpdateCarEntryInput(req.body);

    const carEntry = await prisma.carEntry.findUnique({
      where: { id },
      include: { parking: true },
    });

    if (!carEntry) {
      return ApiResponse.error(res, 404, 'Car entry not found');
    }

    if (carEntry.exitDateTime) {
      return ApiResponse.error(res, 400, 'Car has already exited');
    }

    const updatedCarEntry = await prisma.$transaction(async (tx) => {
      const entry = await tx.carEntry.update({
        where: { id },
        data: {
          exitDateTime: validated.exitDateTime ? new Date(validated.exitDateTime) : new Date(),
          chargedAmount: validated.chargedAmount ?? carEntry.chargedAmount,
        },
      });

      await tx.parking.update({
        where: { id: carEntry.parkingCode},
        data: { numberOfAvailableSpaces: { increment: 1 } },
      });

      return entry;
    });

    return ApiResponse.success(res, 200, 'Car exit updated successfully', {
      carEntry: updatedCarEntry,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes('Invalid') || error.message.includes('required'))
    ) {
      return res.status(400).json({ message: error.message });
    }
    return ApiResponse.serverError(res, error);
  }
};

export const getAllCarEntries = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { role } = req.user;

    if (role !== 'Admin' && role !== 'ParkingAttendant') {
      return ApiResponse.error(res, 403, 'Only admins and parking attendants can view car entries');
    }

    const carEntries = await prisma.carEntry.findMany({
      select: {
        id: true,
        plateNumber: true,
        parkingCode: true,
        entryDateTime: true,
        exitDateTime: true,
        chargedAmount: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return ApiResponse.success(res, 200, 'Car entries retrieved successfully', carEntries);
  } catch (error) {
    return ApiResponse.serverError(res, error);
  }
};
