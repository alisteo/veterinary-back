import { Router } from 'express';

import {
  createPet,
  getMyPets,
  getPet,
  getPets,
  updatePet,
} from '../controllers/pets.controller.js';
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

router.route('/my-pets').get(protectWithJwt, getMyPets);

router
  .route('/:id')
  .get([protectWithJwt, isAdminOrVeterinarian], getPet)
  .put([protectWithJwt, isAdminOrVeterinarian], updatePet);

export default router;
