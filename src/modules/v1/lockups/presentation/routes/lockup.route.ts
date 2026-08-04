import { Router } from 'express';
import { businessTypeRouter } from './business-type';

const router = Router();

router.use('/business-type', businessTypeRouter);

export { router as lockUpRouter };
