import bcryptjs from 'bcryptjs';

import { prisma } from '../db/mysql/index.js';

export const signUpVeterinarian = async (req, res, next) => {
  try {
    const { email, password, direccion, telefono, nombre, identificacion } =
      req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        direccion,
        telefono,
        nombre,
        identificacion,
        es_veterinario: true,
      },
    });

    const veterinarian = await prisma.responsable.create({
      data: {
        userId: user.id,
        especialidad: req.body.especialidad,
        no_registro: req.body.no_registro,
      },
      include: {
        user: true,
      },
    });
    delete veterinarian.user.password;
    res
      .status(201)
      .json({ ok: true, message: 'Usuario creado con éxito!', veterinarian });
  } catch (error) {
    next(error);
  }
};

export const signUpTutor = async (req, res, next) => {
  try {
    const { email, password, direccion, telefono, nombre, identificacion } =
      req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        direccion,
        telefono,
        nombre,
        identificacion,
        es_tutor: true,
      },
    });

    const tutor = await prisma.tutor.create({
      data: {
        userId: user.id,
        observaciones: req.body.observaciones || '',
      },
      include: {
        user: true,
      },
    });
    delete tutor.user.password;
    res
      .status(201)
      .json({ ok: true, message: 'Usuario creado con éxito!', tutor });
  } catch (error) {
    next(error);
  }
};
