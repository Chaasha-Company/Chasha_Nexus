import { platformAdminRefreshTokenRouter } from './refresh-token';
import { adminLoginRouter } from './login';
import { Router } from 'express';

const router = Router();

router.use('/login', adminLoginRouter);
router.use('/refresh-token', platformAdminRefreshTokenRouter);

export { router as adminAuthRouter };
