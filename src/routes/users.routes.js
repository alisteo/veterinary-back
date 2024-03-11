import { Router } from 'express';

import { signUpVeterinarian } from '../controllers/index.js';
import { createVeterinarianRules } from '../middlewares/index.js';
import { protectWithJwt } from '../middlewares/validateJwt.middleware.js';

const router = Router();

router
  .route('/register-responsable')
  .post([protectWithJwt, createVeterinarianRules()], signUpVeterinarian);

export default router;
