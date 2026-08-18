import { businessAuthRouter, requireBusinessEmployeeAuthMiddleware } from '@/modules/v1/authentications';
import { businessAuthzRouter } from '@/modules/v1/authorizations';
import { Router } from 'express';

const router = Router();

router.use('/auth', businessAuthRouter);
router.use('/authz', requireBusinessEmployeeAuthMiddleware, businessAuthzRouter);

export { router as businessRouter };
