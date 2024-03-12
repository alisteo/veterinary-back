import bcryptjs from 'bcryptjs';

import { prisma } from '../db/mysql/index.js';

export const getTutores = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tutores = await prisma.tutor.findMany({
      skip: skip,
      take: limit,
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
    });

    const totalTutores = await prisma.tutor.count();
    const totalPages = Math.ceil(totalTutores / limit);

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.status(200).json({
      ok: true,
      count: totalTutores,
      next:
        page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
      previous: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
      numero_paginas: totalPages,
      data: tutores,
    });
  } catch (error) {
    next(error);
  }
};

export const getTutor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tutor = await prisma.tutor.findUnique({
      where: {
        id: parseInt(id),
      },
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
    });

    if (!tutor) {
      return res.status(404).json({
        ok: false,
        message: 'Tutor no encontrado',
      });
    }

    res.status(200).json(tutor);
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

export const updateTutor = async (req, res, next) => {
  const { id } = req.params;
  const { email, direccion, telefono, nombre, identificacion } = req.body;

  try {
    const tutor = await prisma.tutor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!tutor) {
      return res.status(404).json({
        ok: false,
        message: 'Tutor no encontrado',
      });
    }

    const user = await prisma.user.update({
      where: {
        id: tutor.userId,
      },
      data: {
        email,
        direccion,
        telefono,
        nombre,
        identificacion,
      },
    });

    res.status(200).json({
      ok: true,
      message: 'Tutor actualizado con éxito!',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTutor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tutor = await prisma.tutor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!tutor) {
      return res.status(404).json({
        ok: false,
        message: 'Tutor no encontrado',
      });
    }

    await prisma.user.delete({
      where: {
        id: tutor.userId,
      },
    });

    res.status(200).json({
      ok: true,
      message: 'Tutor eliminado con éxito!',
    });
  } catch (error) {
    next(error);
  }
};
