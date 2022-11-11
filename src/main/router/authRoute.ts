import { Router } from 'express';
import { adaptRouter } from '../adapt/expressAdaptRouter';
import { makeLoginController, makeRegisterController } from '../factory/';

const router = Router();
router.post('/register', adaptRouter(makeRegisterController()));
router.post('/login', adaptRouter(makeLoginController()));

export default router;
