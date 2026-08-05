import { platformAdminRefreshTokenRouter } from './refresh-token';
import { platformAdminMeRouter } from './me';
import { platformAdminLoginRouter } from './login';
import { platformAdminLogoutRouter } from './logout';
import { Router } from 'express';
import { requirePlatformAdminAuthMiddleware } from '@/modules/v1/authentications/presentation/middlewares';

const router = Router();

router.use('/login', platformAdminLoginRouter);
router.use('/refresh-token', platformAdminRefreshTokenRouter);
router.use('/me', requirePlatformAdminAuthMiddleware, platformAdminMeRouter);
router.use('/logout', requirePlatformAdminAuthMiddleware, platformAdminLogoutRouter);

export { router as adminAuthRouter };
