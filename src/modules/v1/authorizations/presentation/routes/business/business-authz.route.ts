import { businessPermissionRouter } from './permission';
import { businessRoleRouter } from './role';
import { Router } from 'express';

const router = Router();

router.use('/permission', businessPermissionRouter);
router.use('/role', businessRoleRouter);

export { router as businessAuthzRouter };
