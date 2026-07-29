import { adminLoginRouter } from './login';
import { Router } from 'express';

const router = Router();

router.use('/login', adminLoginRouter);

export { router as adminAuthRouter };
