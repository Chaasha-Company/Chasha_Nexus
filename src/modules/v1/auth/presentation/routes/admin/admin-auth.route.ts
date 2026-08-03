import { platformAdminRefreshTokenRouter } from './refresh-token';
import { platformAdminMeRouter } from './me';
import { adminLoginRouter } from './login';
import { Router } from 'express';
import { requirePlatformAdminAuthMiddleware } from '@/shared/v1/middlewares/security';

const router = Router();

router.use('/login', adminLoginRouter);
router.use('/refresh-token', platformAdminRefreshTokenRouter);
router.use('/me', requirePlatformAdminAuthMiddleware, platformAdminMeRouter);

export { router as adminAuthRouter };
