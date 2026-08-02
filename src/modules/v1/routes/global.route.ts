import { earlyAccessRequestRouter } from '@/modules/v1/early-access-requests';
import { lockUpRouter } from '@/modules/v1/lockup';
import { Router } from 'express';

const router = Router();

router.use('/lockup', lockUpRouter);
router.use('/early-access-request', earlyAccessRequestRouter);

export { router as globalRouter };
