import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateVehicle } from "@/hooks/use-vehicle";
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
  CreateVehicleFormData,
  vehicleSchema,
} from "@/lib/schemas/vehicle.schemas";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import AddButton from "../Button/AddButton";
import { toast } from "sonner";
import FormInput from "../form-input";

// Define available vehicle types
export const vehicleTypes = ["CAR", "MOTORCYCLE", "TRUCK", "BUS"];

const AddVehicleModal: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const createVehicleMutation = useCreateVehicle();

  const form = useForm<CreateVehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      plateNumber: "",
      type: "CAR",
    },
  });

  const openAddModal = () => setIsAddModalOpen(true);

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    form.reset();
  };

  const onSubmit = async (data: CreateVehicleFormData) => {
    try {
      await createVehicleMutation.mutateAsync(data);
      closeAddModal();
    } catch (error) {
      toast.error("Vehicle creation failed");
    }
  };

  return (
    <div>
      <AddButton handleClick={openAddModal} hoverText="Add vehicle" />
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:rounded">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
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
                      <select {...field} className="main-select">
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
                disabled={createVehicleMutation.isPending}
                className="main-dark-button w-full"
              >
                {createVehicleMutation.isPending ? (
                  <div className="flex items-center justify-center gap-x-2">
                    <ClipLoader size={20} color="#fff" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Add"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddVehicleModal;
