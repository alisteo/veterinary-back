import bcryptjs from 'bcryptjs';

import { prisma } from '../db/mysql/index.js';

export const getVeterinarians = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const veterinarians = await prisma.responsable.findMany({
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

    const totalVeterinarians = await prisma.responsable.count();
    const totalPages = Math.ceil(totalVeterinarians / limit);

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.status(200).json({
      ok: true,
      count: totalVeterinarians,
      next:
        page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
      previous: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
      numero_paginas: totalPages,
      data: veterinarians,
    });
  } catch (error) {
    next(error);
  }
};

export const getVeterinarian = async (req, res, next) => {
  const { id } = req.params;
  try {
    const veterinarian = await prisma.responsable.findUnique({
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

    if (!veterinarian)
      return res
        .status(404)
        .json({ ok: false, msg: 'Veterinario no encontrado' });

    res.status(200).json(veterinarian);
  } catch (error) {
    next(error);
  }
};

export const createVeterinarian = async (req, res, next) => {
  const { email, password, direccion, telefono, nombre, identificacion } =
    req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create user
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
    delete user.password;

    // create veterinarian/responsable
    await prisma.responsable.create({
      data: {
        userId: user?.id,
      },
    });

    res
      .status(201)
      .json({ ok: true, message: 'Veterinario creado con éxito!', user });
  } catch (error) {
    next(error);
  }
};

export const updateVeterinarian = async (req, res, next) => {
  const { id } = req.params;
  const { email, direccion, telefono, nombre, identificacion } = req.body;
  console.log(id);
  console.log({
    email,
    direccion,
    telefono,
    nombre,
    identificacion,
  });

  try {
    // update user based on responsableId
    const responsable = await prisma.responsable.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        userId: true,
      },
    });

    const user = await prisma.user.update({
      where: {
        id: responsable.userId,
      },
      data: {
        email,
        direccion,
        telefono,
        nombre,
        identificacion,
      },
    });
    delete user.password;

    res
      .status(200)
      .json({ ok: true, message: 'Veterinario actualizado con éxito!', user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteVeterinarian = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res
      .status(200)
      .json({ ok: true, message: 'Veterinario eliminado con éxito!' });
  } catch (error) {
    next(error);
  }
};
