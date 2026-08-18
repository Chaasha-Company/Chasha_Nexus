import { Router } from 'express';
import { getAllPlatformAdminPermissionController, permissionGuardPlatformAdminMiddleware } from '@/modules/v1/authorizations/presentation';
import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';

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
