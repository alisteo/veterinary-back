import bcryptjs from 'bcryptjs';

import { prisma } from '../db/mysql/index.js';

export const getPets = async (_req, res, next) => {
  try {
    const pets = await prisma.mascota.findMany();
    res.status(200).json({ ok: true, pets });
  } catch (error) {
    next(error);
  }
};

export const getPet = async (req, res, next) => {
  const { id } = req.params;

  try {
    const pet = await prisma.mascota.findUnique({
      where: {
        id: +id,
      },
    });

    res.status(200).json({ ok: true, pet });
  } catch (error) {
    next(error);
  }
};

export const createPet = async (req, res, next) => {
  const {
    nombre_mascota,
    codigo_chip,
    lugar_implantacion,
    fecha_implantacion,
    especie,
    raza,
    pedigree,
    sexo,
    ubicacion,
    estado,
    tutorId,
  } = req.body;

  try {
    let tutor;
    if (tutorId) {
      tutor = await prisma.tutor.findUnique({
        where: {
          id: tutorId,
        },
      });

      if (!tutor) {
        return res
          .status(404)
          .json({ ok: false, message: 'Tutor no encontrado' });
      }
    }

    // registrar tutor
    if (!tutorId) {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);

      const userTutor = await prisma.user.create({
        data: {
          email: req.body.email,
          password: hashedPassword,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          nombre: req.body.nombre,
          identificacion: req.body.identificacion,
          es_tutor: true,
        },
      });

      tutor = await prisma.tutor.create({
        data: {
          userId: userTutor?.id,
          observaciones: req.body.observaciones || '',
        },
      });
    }

    const responsable = await prisma.responsable.findFirst({
      where: {
        userId: req.authenticatedUser.id,
      },
    });

    const pet = await prisma.mascota.create({
      data: {
        nombre_mascota,
        codigo_chip,
        lugar_implantacion,
        fecha_implantacion,
        especie,
        raza,
        pedigree,
        sexo,
        ubicacion,
        estado,
        tutorId: tutorId || tutor?.id,
        responsableId: responsable?.id,
      },
    });

    res.status(201).json({ ok: true, pet });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
