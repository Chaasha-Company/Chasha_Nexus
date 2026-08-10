import { globalEarlyAccessRequestRouter } from '@/modules/v1/early-access-requests';
import { globalFaqRouter } from '@/modules/v1/faqs';
import { lockUpRouter } from '@/modules/v1/lockups';
import { Router } from 'express';

const router = Router();

router.use('/lockup', lockUpRouter);
router.use('/early-access-request', globalEarlyAccessRequestRouter);
router.use('/faq', globalFaqRouter);

export { router as globalRouter };
