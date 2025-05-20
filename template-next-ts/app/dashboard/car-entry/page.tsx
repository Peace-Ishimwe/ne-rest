"use client";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { Table } from "@/components/table";
import React, { useMemo, useState } from "react";
import { useGetAllCarEntries, useGetTicketForCarEntry, useUpdateCarExit } from "@/hooks/use-car-entry";
import AddCarEntryModal from "@/components/car-entry/add-car-entry-modal";
import LoadingScreen from "@/components/loading-screen";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";

type CarEntry = {
  id: string;
  plateNumber: string;
  parkingId: string;
  parkingName: string;
  entryDateTime: string;
  exitDateTime: string | null;
  chargedAmount: number;
  createdAt: string;
  updatedAt: string;
};

type Ticket = {
  id: string;
  plateNumber: string;
  parkingName: string;
  entryDateTime: string;
};

const CarEntryTable: React.FC = () => {
  const [selectedCarEntryId, setSelectedCarEntryId] = useState<string | null>(null);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const { data: carEntriesData, isLoading } = useGetAllCarEntries();
  const updateCarExitMutation = useUpdateCarExit();
  const { data: ticketData, isLoading: isTicketLoading, error: ticketError } = useGetTicketForCarEntry(selectedCarEntryId || "");

  const handleExit = async (carEntry: CarEntry) => {
    if (carEntry.exitDateTime) {
      toast.error("Car has already exited");
      return;
    }
    try {
      await updateCarExitMutation.mutateAsync({
        id: carEntry.id,
        data: { exitDateTime: new Date().toISOString() },
      });
      toast.success("Car exit updated successfully");
    } catch (error) {
      toast.error("Failed to update car exit");
    }
  };

  const handleViewTicket = async (carEntryId: string) => {
    setSelectedCarEntryId(carEntryId);
    setTicketDialogOpen(true);
  };

  const formattedCarEntries = useMemo(() => {
    if (!carEntriesData?.data) return [];

    return carEntriesData.data.map((carEntry: CarEntry) => ({
      ...carEntry,
      entryDateTimeDisplay: carEntry.entryDateTime
        ? dayjs(carEntry.entryDateTime).format("MMM D, YYYY HH:mm")
        : "",
      exitDateTimeDisplay: carEntry.exitDateTime
        ? dayjs(carEntry.exitDateTime).format("MMM D, YYYY HH:mm")
        : "",
      chargedAmountDisplay: carEntry.chargedAmount.toFixed(2),
    }));
  }, [carEntriesData]);

  const columns = [
    { key: "plateNumber", label: "Plate Number" },
    { key: "parkingName", label: "Parking Lot" },
    { key: "entryDateTimeDisplay", label: "Entry Time" },
    { key: "exitDateTimeDisplay", label: "Exit Time" },
    { key: "chargedAmountDisplay", label: "Charged Amount" },
    { key: "actions", label: "Actions" },
  ];

  const tableData = formattedCarEntries.map((carEntry: any) => ({
    ...carEntry,
    actions: (
      <div className="flex space-x-2">
        <button
          className="text-textIcon"
          onClick={() => handleExit(carEntry)}
          disabled={carEntry.exitDateTime || updateCarExitMutation.isPending}
        >
          <Icon icon="ic:baseline-exit-to-app" fontSize={18} />
        </button>
        <button
          className="text-textIcon"
          onClick={() => handleViewTicket(carEntry.id)}
          disabled={isTicketLoading}
        >
          <Icon icon="ic:baseline-receipt" fontSize={18} />
        </button>
      </div>
    ),
  }));

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Table
        paginate
        exportable
        data={tableData}
        columns={columns}
        title="Car Entries"
        exportData={tableData}
        additionalButton={<AddCarEntryModal />}
      />
      <Dialog open={ticketDialogOpen} onOpenChange={setTicketDialogOpen}>
        <DialogContent className="sm:rounded">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
          </DialogHeader>
          {isTicketLoading ? (
            <div className="flex justify-center">
              <ClipLoader size={20} color="#000" />
            </div>
          ) : ticketError ? (
            <p className="text-red-600">Failed to load ticket: {ticketError.message}</p>
          ) : ticketData?.data?.[0] ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Ticket ID</p>
                <p className="text-sm text-gray-900">{ticketData.data[0].id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Plate Number</p>
                <p className="text-sm text-gray-900">{ticketData.data[0].plateNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Parking Lot</p>
                <p className="text-sm text-gray-900">{ticketData.data[0].parkingName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Entry Time</p>
                <p className="text-sm text-gray-900">
                  {new Date(ticketData.data[0].entryDateTime).toLocaleString()}
                </p>
              </div>
              <Button
                onClick={() => {
                  setTicketDialogOpen(false);
                  setSelectedCarEntryId(null);
                }}
                className="main-dark-button w-full"
              >
                Close
              </Button>
            </div>
          ) : (
            <p>No ticket data available</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarEntryTable;