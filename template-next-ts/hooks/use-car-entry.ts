import { UtilsService } from "@/services/utils.service";
import { CarEntryService } from "@/services/car-entry.service";
import { CreateCarEntryFormData, UpdateCarEntryFormData } from "@/lib/schema/car-entry.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const utils = new UtilsService();
const carEntryService = new CarEntryService(utils);

export const useCreateCarEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCarEntryFormData) => carEntryService.createCarEntry(data),
    onSuccess: async (response) => {
      queryClient.invalidateQueries({ queryKey: ["parkings"] });
      queryClient.invalidateQueries({ queryKey: ["carEntries"] });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: async (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCarExit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCarEntryFormData }) =>
      carEntryService.updateCarExit({ id, data }),
    onSuccess: async (response) => {
      queryClient.invalidateQueries({ queryKey: ["parkings"] });
      queryClient.invalidateQueries({ queryKey: ["carEntries"] });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: async (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllCarEntries = () => {
  return useQuery({
    queryKey: ["carEntries"],
    queryFn: () => carEntryService.getAllCarEntries(),
  });
};