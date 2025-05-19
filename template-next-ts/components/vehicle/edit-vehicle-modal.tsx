import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateVehicle } from "@/hooks/use-vehicle";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateVehicleFormData,
  vehicleSchema,
  vehicleTypes,
} from "@/lib/schemas/vehicle.schemas";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import FormInput from "../form-input";

interface EditVehicleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  vehicle: Vehicle;
}

const EditVehicleModal: React.FC<EditVehicleModalProps> = ({
  isOpen,
  closeModal,
  vehicle,
}) => {
  const updateVehicleMutation = useUpdateVehicle();

  const form = useForm<UpdateVehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      plateNumber: vehicle.plateNumber,
      type: vehicle.type,
    },
  });

  const onSubmit = async (data: UpdateVehicleFormData) => {
    try {
      await updateVehicleMutation.mutateAsync({ id: vehicle.id, data });
      closeModal();
    } catch (error) {
      toast.error("Updating vehicle failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:rounded">
        <DialogHeader>
          <DialogTitle>Edit Vehicle</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              control={form.control}
              name="plateNumber"
              label="Plate Number"
              placeholder="ABC123"
              type="text"
              description="Enter plate number"
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="main-select"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value as (typeof vehicleTypes)[number]
                        )
                      }
                    >
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={updateVehicleMutation.isPending}
              className="main-dark-button w-full"
            >
              {updateVehicleMutation.isPending ? (
                <div className="flex items-center justify-center gap-x-2">
                  <ClipLoader size={20} color="#fff" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleModal;
