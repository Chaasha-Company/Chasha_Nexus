import { Router } from 'express';
import { getAllBusinessPermissionController, permissionGuardBusinessMiddleware } from '@/modules/v1/authorizations/presentation';
import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';

const router = Router();

router.get(
  '/get-all',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'platform-admin-permission', businessPermissionAction: PermissionActionEnum.READ, businessPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_PERMISSION_GET_ALL }),
  getAllBusinessPermissionController,
);

export { router as businessPermissionRouter };
