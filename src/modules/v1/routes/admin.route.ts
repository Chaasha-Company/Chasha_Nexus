import { adminAuthRouter, requirePlatformAdminAuthMiddleware } from '@/modules/v1/authentications';
import { adminAuthzRouter } from '@/modules/v1/authorizations';
import { adminEarlyAccessRequestRouter } from '@/modules/v1/early-access-requests';
import { adminFaqRouter } from '@/modules/v1/faqs';
import { Router } from 'express';

const router = Router();

router.use('/auth', adminAuthRouter);
router.use('/authz', requirePlatformAdminAuthMiddleware, adminAuthzRouter);
router.use('/early-access-request', requirePlatformAdminAuthMiddleware, adminEarlyAccessRequestRouter);
router.use('/faq', requirePlatformAdminAuthMiddleware, adminFaqRouter);

export { router as adminRouter };
