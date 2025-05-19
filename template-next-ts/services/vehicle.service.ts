import { authorizedAPI } from "@/config/axios.config";
import { UtilsService } from "./utils.service";
import { CreateVehicleFormData, UpdateVehicleFormData } from "@/lib/schemas/vehicle.schemas";

export class VehicleService {
    constructor(
        private readonly utils: UtilsService
    ) { }

    createVehicle(data: CreateVehicleFormData) {
        return this.utils.handleApiRequest(() => authorizedAPI.post('/vehicle', data))
    }

    getMyVehicles() {
        return this.utils.handleApiRequest(() => authorizedAPI.get('/vehicle'))
    }

    updateVehicle({ id, data }: { id: string, data: UpdateVehicleFormData }) {
        return this.utils.handleApiRequest(() => authorizedAPI.put(`/vehicle/${id}`, data))
    }

    deleteVehicle({ id }: { id: string }) {
        return this.utils.handleApiRequest(() => authorizedAPI.delete(`/vehicle/${id}`))
    }
}