import { businessRefreshTokenRouter } from './refresh-token';
import { businessLoginRouter } from './login';
import { Router } from 'express';

const router = Router();

router.use('/login', businessLoginRouter);
router.use('/refresh-token', businessRefreshTokenRouter);

export { router as businessAuthRouter };
