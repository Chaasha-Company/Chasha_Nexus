import { businessRefreshTokenRouter } from './refresh-token';
import { businessLoginRouter } from './login';
import { businessMeRouter } from './me';
import { Router } from 'express';
import { requireBusinessEmployeeAuthMiddleware } from '@/shared/v1/middlewares/security';

const router = Router();

router.use('/login', businessLoginRouter);
router.use('/refresh-token', businessRefreshTokenRouter);
router.use('/me', requireBusinessEmployeeAuthMiddleware, businessMeRouter);

export { router as businessAuthRouter };
