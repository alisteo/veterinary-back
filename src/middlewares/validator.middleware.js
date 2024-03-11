import { body, validationResult } from 'express-validator';
import { isAlreadyRegistered } from '../helpers/index.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ ok: false, errors: errors.mapped() });

  return next();
};

// Auth
export const emailPassRules = () => [
  body('email', 'Invalid email!').isEmail(),
  body('password', 'Password must be longer than 6 characters!').isLength({
    min: 6,
  }),
];

export const signUpRules = () => [
  ...emailPassRules(),
  validate,

  body('nombre', 'El nombre es obligatorio').notEmpty(),
  body('identificacion', 'La identificación es obligatoria').notEmpty(),
  body('direccion', 'La dirección es obligatoria').notEmpty(),
  body('telefono', 'El teléfono es obligatorio').notEmpty(),
  validate,

  body('email').custom(email => isAlreadyRegistered(email, 'user')),
  validate,

 
];

export const loginRules = () => [...emailPassRules(), validate];
