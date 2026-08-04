import { adminAuthRouter } from '@/modules/v1/authentications';
import { Router } from 'express';

const router = Router();

router.use('/auth', adminAuthRouter);

export { router as adminRouter };
