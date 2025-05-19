import { CreateVehicleFormData, UpdateVehicleFormData } from "@/lib/schemas/vehicle.schemas";
import { UtilsService } from "@/services/utils.service";
import { VehicleService } from "@/services/vehicle.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const utils = new UtilsService()
const vehicleService = new VehicleService(utils)

export const useCreateVehicle = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateVehicleFormData) => vehicleService.createVehicle(data),
        onSuccess: async (response) => {
            queryClient.invalidateQueries({ queryKey: ['my-vehicles'] })
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        },
        onError: async (error) => {
            toast.error(error.message)
        }
    })
}

export const useGetMyVehicles = () => {
    return useQuery({
        queryKey: ['my-vehicles'],
        queryFn: () => vehicleService.getMyVehicles(),
    })
}

export const useUpdateVehicle = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateVehicleFormData }) => vehicleService.updateVehicle({ id, data }),
        onSuccess: async (response) => {
            queryClient.invalidateQueries({ queryKey: ['my-vehicles'] })
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        },
        onError: async (error) => {
            toast.error(error.message)
        }
    })
}

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id }: { id: string }) => vehicleService.deleteVehicle({ id }),
        onSuccess: async (response) => {
            queryClient.invalidateQueries({ queryKey: ['my-vehicles'] })
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        },
        onError: async (error) => {
            toast.error(error.message)
        }
    })
}