import { businessAuthRouter } from '@/modules/v1/auth';
import { Router } from 'express';

const router = Router();

router.use('/auth', businessAuthRouter);

export { router as businessRouter };
