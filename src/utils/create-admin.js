import bcryptjs from 'bcryptjs';

import { prisma } from '../db/mysql/index.js';

export const createAdminUser = async () => {
  const existingAdmin = await prisma.user.findFirst({
    where: {
      email: 'admin@admin.com',
    },
  });

  if (!existingAdmin) {
    try {
      const hashedPassword = await bcryptjs.hash('adminadmin', 10);

      const user = await prisma.user.create({
        data: {
          email: 'admin@admin.com',
          password: hashedPassword,
          nombre: 'Admin',
          identificacion: '1717172732',
          telefono: '0999999999',
          direccion: 'Some Adress',
          es_admin: true,
          es_veterinario: true,
        },
      });

      await prisma.veterinario.create({
        data: {
          userId: user?.id,
          especialidad: 'Admin',
          no_registro: '1234567890',
        },
      });
    } catch (error) {
      console.log('Error creating admin user:', error);
      process.exit(1);
    }
  }
};
