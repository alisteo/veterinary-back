import { prisma } from '../db/mysql/index.js';
import { buildPdfPet } from '../utils/pdfkit.js';

export const pdfPet = async (req, res, next) => {
  const { id } = req.params;

  try {
    const pet = await prisma.mascota.findUnique({
      where: {
        id: +id,
      },
      include: {
        Tutor: {
          include: {
            user: {
              select: {
                id: true,
                nombre: true,
                identificacion: true,
                direccion: true,
                telefono: true,
                email: true,
              },
            },
          },
        },
        Responsable: {
          include: {
            user: {
              select: {
                id: true,
                nombre: true,
                identificacion: true,
                direccion: true,
                telefono: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${pet.nombre_mascota}.pdf`,
    });

    buildPdfPet(
      data => {
        stream.write(data);
      },
      () => {
        stream.end();
      },
      pet
    );

    // res.status(200).json(pet);
  } catch (error) {
    next(error);
  }
};
