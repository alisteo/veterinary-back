import { Router } from 'express';
import { login, renewJwt, signUp } from '../controllers/index.js';
import {
  loginRules,
  protectWithJwt,
  signUpRules,
} from '../middlewares/index.js';

const router = Router();

router.post('/login', loginRules(), login);
router.post('/registro', signUpRules(), signUp);

router.get('/renew', protectWithJwt, renewJwt);

export default router;
