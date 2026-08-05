import { businessRefreshTokenRouter } from './refresh-token';
import { businessLoginRouter } from './login';
import { businessMeRouter } from './me';
import { businessLogoutRouter } from './logout';
import { Router } from 'express';
import { requireBusinessEmployeeAuthMiddleware } from '@/modules/v1/authentications/presentation/middlewares';

const router = Router();

router.use('/login', businessLoginRouter);
router.use('/refresh-token', businessRefreshTokenRouter);
router.use('/me', requireBusinessEmployeeAuthMiddleware, businessMeRouter);
router.use('/logout', requireBusinessEmployeeAuthMiddleware, businessLogoutRouter);

export { router as businessAuthRouter };
