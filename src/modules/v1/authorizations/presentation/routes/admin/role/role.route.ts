import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';
import { getAllPlatformAdminRoleController, getListOptionPlatformAdminRoleController } from '@/modules/v1/authorizations/presentation/controllers';
import { permissionGuardPlatformAdminMiddleware } from '@/modules/v1/authorizations/presentation/middlewares';
import { GetAllPlatformAdminRoleQueryValidation } from '@/modules/v1/authorizations/presentation/validations';
import { validateQueryMiddleware } from '@/shared/v1/middlewares/validation';
import { Router } from 'express';

const router = Router();

router.get(
  '/list',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_LIST }),
  validateQueryMiddleware(GetAllPlatformAdminRoleQueryValidation),
  getAllPlatformAdminRoleController,
);

router.get(
  '/list-option',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platoform-admin-role', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_LIST_OPTIONS }),
  getListOptionPlatformAdminRoleController,
);

export { router as platformAdminRoleRouter };
