import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';
import { getListOptionPlatformAdminRoleController } from '@/modules/v1/authorizations/presentation/controllers';
import { permissionGuardPlatformAdminMiddleware } from '@/modules/v1/authorizations/presentation/middlewares';
import { Router } from 'express';

const router = Router();

router.get(
  '/list-option',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platoform-admin-role', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_LIST_OPTIONS }),
  getListOptionPlatformAdminRoleController,
);

export { router as platformAdminRoleRouter };
