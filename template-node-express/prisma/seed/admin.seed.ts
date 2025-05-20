import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SeedAdmin = async() => {
  const password = await bcrypt.hash('password', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@pms.com',
      password,
      role: 'Admin',
      status: 'ENABLED',
      isVerified: true,
    },
  });

  console.log('Admin user seeded:', admin);
}

export default SeedAdmin