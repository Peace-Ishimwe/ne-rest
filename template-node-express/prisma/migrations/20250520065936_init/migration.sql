/*
  Warnings:

  - The values [SuperAdmin] on the enum `RoleName` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ParkingSpot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParkingZone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Receipt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleName_new" AS ENUM ('User', 'Admin');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "RoleName_new" USING ("role"::text::"RoleName_new");
ALTER TYPE "RoleName" RENAME TO "RoleName_old";
ALTER TYPE "RoleName_new" RENAME TO "RoleName";
DROP TYPE "RoleName_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'User';
COMMIT;

-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_zoneId_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_spotId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_spotId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_ownerId_fkey";

-- DropTable
DROP TABLE "ParkingSpot";

-- DropTable
DROP TABLE "ParkingZone";

-- DropTable
DROP TABLE "Receipt";

-- DropTable
DROP TABLE "Reservation";

-- DropTable
DROP TABLE "Ticket";

-- DropTable
DROP TABLE "Vehicle";

-- DropEnum
DROP TYPE "SpotStatus";

-- DropEnum
DROP TYPE "SpotType";

-- DropEnum
DROP TYPE "VehicleType";

-- CreateTable
CREATE TABLE "Parking" (
    "id" UUID NOT NULL,
    "parkingName" TEXT NOT NULL,
    "numberOfAvailableSpaces" INTEGER NOT NULL,
    "chargingFeesPerHour" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parking_parkingName_key" ON "Parking"("parkingName");
