// src/routes/vehicle.routes.ts
import express from 'express';
import {
    createVehicle,
    getMyVehicles,
    updateVehicle,
    deleteVehicle
} from '../controllers/vehicle.controller';
import { makeMiddleware } from '../middleware';

const vehicleRouter = express.Router();

const { protect } = makeMiddleware()

vehicleRouter.use(protect);

vehicleRouter.post('/', createVehicle);
vehicleRouter.get('/', getMyVehicles);
vehicleRouter.put('/:id', updateVehicle);
vehicleRouter.delete('/:id', deleteVehicle);

export default vehicleRouter;