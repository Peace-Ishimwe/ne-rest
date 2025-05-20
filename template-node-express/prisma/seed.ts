import { PrismaClient } from "@prisma/client";
import SeedAdmin from "./seed/admin.seed";

const prisma = new PrismaClient();

const main = async() => {
    console.log("Seeding admin started....")
    await SeedAdmin()
    console.log("Seeding admin completed....")
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
