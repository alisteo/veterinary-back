import { Router } from 'express';

import { createPet, getPet, getPets } from '../controllers/pets.controller.js';
import {
  isAdminOrVeterinarian,
  protectWithJwt,
} from '../middlewares/validateJwt.middleware.js';
import { createPetRules } from '../middlewares/validator.middleware.js';

const router = Router();

router
  .route('/')
  .post([protectWithJwt, isAdminOrVeterinarian, ...createPetRules()], createPet)
  .get([protectWithJwt, isAdminOrVeterinarian], getPets);

router.route('/:id').get(getPet);

export default router;
