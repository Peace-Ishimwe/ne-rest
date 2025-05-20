"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateCarEntry } from "@/hooks/use-car-entry";
import { useGetAllParkings } from "@/hooks/use-parking";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCarEntryFormData,
  createCarEntrySchema,
} from "@/lib/schema/car-entry.schema";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import AddButton from "../Button/AddButton";
import { toast } from "sonner";
import FormInput from "../form-input";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Parking = {
  id: string;
  parkingName: string;
  numberOfAvailableSpaces: number;
  chargingFeesPerHour: number;
  createdAt: string;
  updatedAt: string;
};

const AddCarEntryModal: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [comboOpen, setComboOpen] = React.useState(false);
  const createCarEntryMutation = useCreateCarEntry();
  const { data: parkingsData, isLoading: isParkingsLoading } = useGetAllParkings();

  const form = useForm<CreateCarEntryFormData>({
    resolver: zodResolver(createCarEntrySchema),
    defaultValues: {
      plateNumber: "",
      parkingCode: "",
    },
  });

  const openAddModal = () => setIsAddModalOpen(true);

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setComboOpen(false);
    form.reset();
  };

  const onSubmit = async (data: CreateCarEntryFormData) => {
    try {
      await createCarEntryMutation.mutateAsync(data);
      closeAddModal();
    } catch (error) {
      toast.error("Car entry creation failed");
    }
  };

  const parkings = parkingsData?.data ?? [];

  return (
    <div>
      <AddButton handleClick={openAddModal} hoverText="Add car entry" />
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:rounded">
          <DialogHeader>
            <DialogTitle>Add New Car Entry</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                control={form.control}
                name="plateNumber"
                label="Plate Number"
                placeholder="ABC-123"
                type="text"
                description="Enter the car plate number"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parking Lot
                </label>
                <Popover open={comboOpen} onOpenChange={setComboOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={comboOpen}
                      className="w-full justify-between"
                      disabled={isParkingsLoading}
                    >
                      {form.watch("parkingCode")
                        ? parkings.find(
                            (parking: Parking) =>
                              parking.id === form.watch("parkingCode")
                          )?.parkingName
                        : "Select parking lot..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search parking lot..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No parking lot found.</CommandEmpty>
                        <CommandGroup>
                          {parkings.map((parking: Parking) => (
                            <CommandItem
                              key={parking.id}
                              value={parking.id}
                              onSelect={(currentValue) => {
                                form.setValue(
                                  "parkingCode",
                                  currentValue === form.watch("parkingCode")
                                    ? ""
                                    : currentValue
                                );
                                setComboOpen(false);
                              }}
                            >
                              {parking.parkingName}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  form.watch("parkingCode") === parking.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p className="mt-1 text-sm text-gray-500">
                  Select a parking lot
                </p>
                {form.formState.errors.parkingCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.parkingCode.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={createCarEntryMutation.isPending || isParkingsLoading}
                className="main-dark-button w-full"
              >
                {createCarEntryMutation.isPending ? (
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

export default AddCarEntryModal;