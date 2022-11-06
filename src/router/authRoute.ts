import { Router } from 'express';
import { adaptRouter } from '../adapt/expressAdaptRouter';
import { makeLoginController } from '../factory/makeLoginController';
import { makeRegisterController } from '../factory/makeRegisterController';

const router = Router();
router.post('/register', adaptRouter(makeRegisterController()));
router.post('/login', adaptRouter(makeLoginController()));

export default router;
