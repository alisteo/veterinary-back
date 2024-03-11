import jwt from 'jsonwebtoken';

import { SECRETORPRIVATEKEY_JWT } from '../config/index.js';
import { prisma } from '../db/mysql/index.js';
import { createError } from '../utils/error.js';

// check token in req.cookies
export const protectWithJwt = async (req, res, next) => {
  const tokenJwt = req.cookies.access_token;
  if (!tokenJwt) return next(createError(401, 'You are not authenticated!'));

  try {
    const { id } = jwt.verify(tokenJwt, SECRETORPRIVATEKEY_JWT);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return next(createError(401, 'Invalid token!'));

    req.authenticatedUser = user;

    return next();
  } catch (error) {
    return next(createError(401, 'Invalid token!'));
  }
};

export const verifyUser = (req, res, next) => {
  protectWithJwt(req, res, next, () => {
    if (
      req.authenticatedUser.id === req.params.id ||
      req.authenticatedUser.isAdmin
    )
      return next();
  });

  return next(createError(403, 'You are not authorized!'));
};

export const verifyAdmin = (req, res, next) => {
  protectWithJwt(req, res, next, () => {
    if (req.authenticatedUser.isAdmin) {
      return next();
    }

    return next(createError(403, 'You are not authorized!'));
  });
};
