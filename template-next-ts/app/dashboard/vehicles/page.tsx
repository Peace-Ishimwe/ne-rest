"use client"
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import { Table } from '@/components/table';
import React, { useMemo, useState } from 'react';
import { useGetMyVehicles } from '@/hooks/use-vehicle';
import AddVehicleModal from '@/components/vehicle/add-vehicle-modal';
import EditVehicleModal from '@/components/vehicle/edit-vehicle-modal';
import DeleteVehicleDialog from '@/components/vehicle/delete-vehicle-dialog';

const VehicleTable: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const { data: vehiclesData, isLoading } = useGetMyVehicles();

  const openEditModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedVehicle(null);
  };

  const openDeleteDialog = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedVehicle(null);
  };

  const formattedVehicles = useMemo(() => {
    if (!vehiclesData?.data) return [];

    return vehiclesData.data.map((vehicle: Vehicle) => ({
      ...vehicle,
      updatedAtDisplay: vehicle.updatedAt ? dayjs(vehicle.updatedAt).format('MMM D, YYYY') : '',
    }));
  }, [vehiclesData]);

  const columns = [
    { key: 'plateNumber', label: 'Plate Number' },
    { key: 'type', label: 'Type' },
    { key: 'updatedAtDisplay', label: 'Updated At' },
    { key: 'actions', label: 'Actions' },
  ];

  const tableData = formattedVehicles.map((vehicle: any) => ({
    ...vehicle,
    actions: (
      <div className="flex space-x-2">
        <button className="text-textIcon" onClick={() => openEditModal(vehicle)}>
          <Icon icon="ic:baseline-edit" fontSize={18} />
        </button>
        <button className="text-textIcon" onClick={() => openDeleteDialog(vehicle)}>
          <Icon icon="ic:baseline-delete" fontSize={18} />
        </button>
      </div>
    ),
  }));

  return (
    <div>
      <Table
        paginate
        exportable
        data={tableData}
        columns={columns}
        title="Vehicles"
        exportData={tableData}
        additionalButton={<AddVehicleModal />}
      />
      {selectedVehicle && (
        <>
          <EditVehicleModal
            isOpen={isEditModalOpen}
            closeModal={closeEditModal}
            vehicle={selectedVehicle}
          />
          <DeleteVehicleDialog
            isOpen={isDeleteDialogOpen}
            closeDialog={closeDeleteDialog}
            vehicle={selectedVehicle}
          />
        </>
      )}
    </div>
  );
};

export default VehicleTable;