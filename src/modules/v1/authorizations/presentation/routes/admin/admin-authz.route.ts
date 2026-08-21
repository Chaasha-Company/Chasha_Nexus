import { platformAdminRoleRouter } from './role';
import { platformAdminPermissionRouter } from './permission';
import { Router } from 'express';

const router = Router();

router.use('/permission', platformAdminPermissionRouter);
router.use('/role', platformAdminRoleRouter);

export { router as adminAuthzRouter };
