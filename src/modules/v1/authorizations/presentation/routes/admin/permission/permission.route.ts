import { Router } from 'express';
import { getAllPlatformAdminPermissionController } from '@/modules/v1/authorizations/presentation/controllers/admin/permission/get-all-platform-admin-permission.controller';
import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';
import { permissionGuardPlatformAdminMiddleware } from '../../../middlewares/platform-admin/permission-guard-platform-admin.middleware';

const router = Router();

router.get(
  '/get-all',
  permissionGuardPlatformAdminMiddleware({
    platformAdminPermissionModule: 'business-employee-permission',
    platformAdminPermissionAction: PermissionActionEnum.READ,
    platformAdminPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_PERMISSION_GET_ALL,
  }),
  getAllPlatformAdminPermissionController,
);

export { router as platformAdminPermissionRouter };
