import { businessPermissionRouter } from './permission';
import { Router } from 'express';

const router = Router();

router.use('/permission', businessPermissionRouter);

export { router as businessAuthzRouter };
