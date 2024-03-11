import { prisma } from '../db/mysql/index.js';

export const getPets = async (_req, res, next) => {
  try {
    const pets = await prisma.mascota.findMany();
    res.status(200).json({ ok: true, pets });
  } catch (error) {
    next(error);
  }
};
