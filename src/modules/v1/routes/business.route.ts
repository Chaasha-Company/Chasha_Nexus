import { businessAuthRouter } from '@/modules/v1/authentications';
import { Router } from 'express';

const router = Router();

router.use('/auth', businessAuthRouter);

export { router as businessRouter };
