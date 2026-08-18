import { platformAdminPermissionRouter } from './permission';
import { Router } from 'express';

const router = Router();

router.use('/permission', platformAdminPermissionRouter);

export { router as adminAuthzRouter };
