import { Router } from 'express';
import { getAllPlatformAdminPermissionController } from '@/modules/v1/authorizations/presentation/controllers/admin/permission/get-all-platform-admin-permission.controller';
import { permissionGuardPlatformAdminMiddleware } from '@/modules/v1/authorizations/presentation';
import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';

const router = Router();

router.get(
  '/get-all',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-permission', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_PERMISSION_GET_ALL }),
  getAllPlatformAdminPermissionController,
);

export { router as platformAdminPermissionRouter };
