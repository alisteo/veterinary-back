import { prisma } from '../db/mysql/index.js';

export async function createAdminUser() {
  const existingAdmin = await prisma.user.findFirst({
    where: {
      email: 'admin@admin.com',
    },
  });

  if (!existingAdmin) {
    console.log('Creating admin user');

    await prisma.user.create({
      data: {
        email: 'admin@admin.com',
        password: 'adminadmin',
        nombre: 'Admin',
        identificacion: '1717172732',
        telefono: '0999999999',
        direccion: 'Some Adress',
        es_admin: true,
      },
    });
  }
}
