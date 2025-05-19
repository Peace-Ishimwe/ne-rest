import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteVehicle } from "@/hooks/use-vehicle";
import { toast } from "sonner";

interface DeleteVehicleDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  vehicle: Vehicle;
}

const DeleteVehicleDialog: React.FC<DeleteVehicleDialogProps> = ({
  isOpen,
  closeDialog,
  vehicle,
}) => {
  const deleteVehicleMutation = useDeleteVehicle();

  const handleDelete = async () => {
    try {
      await deleteVehicleMutation.mutateAsync({ id: vehicle.id });
      closeDialog();
    } catch (error) {
      toast.error("Deleting vehicle failed");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            vehicle with plate number <strong>{vehicle.plateNumber}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {deleteVehicleMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteVehicleDialog;
