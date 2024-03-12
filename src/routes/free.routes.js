import { Router } from 'express';
import { getPetsFree } from '../controllers/free.controller.js';

const router = Router();

router.route('/pets').get(getPetsFree);

export default router;
