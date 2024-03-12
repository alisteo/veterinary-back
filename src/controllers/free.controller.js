import { prisma } from '../db/mysql/index.js';

export const getPetsFree = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // La página actual, por defecto es 1
    const pageSize = parseInt(req.query.pageSize) || 10; // El número de registros por página, por defecto es 10

    const pets = await prisma.mascota.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
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
      },
    });

    const totalPets = await prisma.mascota.count(); // Obtiene el total de mascotas
    const totalPages = Math.ceil(totalPets / pageSize); // Calcula el total de páginas

    res.status(200).json({
      ok: true,
      count: totalPets,
      next: page < totalPages ? page + 1 : null,
      previous: page > 1 ? page - 1 : null,
      numero_paginas: totalPages,
      data: pets,
    });
  } catch (error) {
    next(error);
  }
};