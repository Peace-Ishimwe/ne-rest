-- CreateTable
CREATE TABLE "Ticket" (
    "id" UUID NOT NULL,
    "carEntryId" UUID NOT NULL,
    "parkingId" UUID NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "parkingName" TEXT NOT NULL,
    "entryDateTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_carEntryId_fkey" FOREIGN KEY ("carEntryId") REFERENCES "CarEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
