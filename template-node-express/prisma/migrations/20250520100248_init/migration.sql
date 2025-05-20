/*
  Warnings:

  - Added the required column `parkingId` to the `CarEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CarEntry" DROP CONSTRAINT "CarEntry_parkingCode_fkey";

-- AlterTable
ALTER TABLE "CarEntry" ADD COLUMN     "parkingId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "CarEntry" ADD CONSTRAINT "CarEntry_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
