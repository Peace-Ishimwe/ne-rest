"use client";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { Table } from "@/components/table";
import React, { useMemo, useState } from "react";
import { useGetAllCarEntries, useUpdateCarExit } from "@/hooks/use-car-entry";
import AddCarEntryModal from "@/components/car-entry/add-car-entry-modal";
import LoadingScreen from "@/components/loading-screen";
import { toast } from "sonner";

type CarEntry = {
  id: string;
  plateNumber: string;
  parkingCode: string;
  entryDateTime: string;
  exitDateTime: string | null;
  chargedAmount: number;
  parkingId: string;
  createdAt: string;
  updatedAt: string;
};

const CarEntryTable: React.FC = () => {
  const [selectedCarEntry, setSelectedCarEntry] = useState<CarEntry | null>(null);
  const { data: carEntriesData, isLoading } = useGetAllCarEntries();
  const updateCarExitMutation = useUpdateCarExit();

  const handleExit = async (carEntry: CarEntry) => {
    if (carEntry.exitDateTime) {
      toast.error("Car has already exited");
      return;
    }
    try {
      await updateCarExitMutation.mutateAsync({
        id: carEntry.id,
        data: { exitDateTime: new Date().toISOString(), chargedAmount: 0 },
      });
    } catch (error) {
      toast.error("Failed to update car exit");
    }
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
    }));
  }, [carEntriesData]);

  const columns = [
    { key: "plateNumber", label: "Plate Number" },
    { key: "parkingCode", label: "Parking Code" },
    { key: "entryDateTimeDisplay", label: "Entry Time" },
    { key: "exitDateTimeDisplay", label: "Exit Time" },
    { key: "chargedAmount", label: "Charged Amount" },
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
    </div>
  );
};

export default CarEntryTable;