-- CreateEnum
CREATE TYPE "SpotStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'RESERVED', 'OUT_OF_ORDER');

-- CreateEnum
CREATE TYPE "SpotType" AS ENUM ('REGULAR', 'COMPACT', 'HANDICAPPED', 'ELECTRIC');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'MOTORCYCLE', 'TRUCK', 'ELECTRIC');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" UUID NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "type" "VehicleType" NOT NULL,
    "ownerId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" UUID NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "spotId" UUID NOT NULL,
    "vehicleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingZone" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParkingZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSpot" (
    "id" UUID NOT NULL,
    "spotNumber" TEXT NOT NULL,
    "status" "SpotStatus" NOT NULL DEFAULT 'AVAILABLE',
    "type" "SpotType" NOT NULL DEFAULT 'REGULAR',
    "zoneId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" UUID NOT NULL,
    "vehicleId" UUID NOT NULL,
    "spotId" UUID NOT NULL,
    "entryTime" TIMESTAMP(3) NOT NULL,
    "exitTime" TIMESTAMP(3),
    "durationMin" INTEGER,
    "totalFee" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" UUID NOT NULL,
    "ticketId" UUID NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amountPaid" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plateNumber_key" ON "Vehicle"("plateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_ticketId_key" ON "Receipt"("ticketId");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "ParkingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "ParkingZone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "ParkingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
