import { adminAuthRouter, requirePlatformAdminAuthMiddleware } from '@/modules/v1/authentications';
import { adminEarlyAccessRequestRouter } from '@/modules/v1/early-access-requests';
import { Router } from 'express';

const router = Router();

router.use('/auth', adminAuthRouter);
router.use('/early-access-request', requirePlatformAdminAuthMiddleware, adminEarlyAccessRequestRouter);

export { router as adminRouter };
