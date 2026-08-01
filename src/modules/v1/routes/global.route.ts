import { lockUpRouter } from '@/modules/v1/lockup';
import { Router } from 'express';

const router = Router();

router.use('/lockup', lockUpRouter);

export { router as globalRouter };
