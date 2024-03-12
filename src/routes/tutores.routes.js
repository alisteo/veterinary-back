import { Router } from 'express';

import {
  getTutor,
  getTutors,
  updateTutor,
} from '../controllers/tutores.controller.js';
import { signUpTutor } from '../controllers/users.controller.js';
import {
  protectWithJwt,
  verifyAdmin,
} from '../middlewares/validateJwt.middleware.js';

const router = Router();

router
  .route('/')
  .get([protectWithJwt, verifyAdmin], getTutors)
  .post([protectWithJwt, verifyAdmin], signUpTutor);

router
  .route('/:id')
  .get([protectWithJwt, verifyAdmin], getTutor)
  .put([protectWithJwt, verifyAdmin], updateTutor);

export default router;
