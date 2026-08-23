import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';
import { createPlatformAdminRoleController, detailPlatformAdminRoleController, getAllPlatformAdminRoleController, getListOptionPlatformAdminRoleController } from '@/modules/v1/authorizations/presentation/controllers';
import { permissionGuardPlatformAdminMiddleware } from '@/modules/v1/authorizations/presentation/middlewares';
import { CreatePlatformAdminRoleValidation, DetailPlatformAdminRoleValidation, GetAllPlatformAdminRoleQueryValidation } from '@/modules/v1/authorizations/presentation/validations';
import { validateBodyMiddleware, validateQueryMiddleware } from '@/shared/v1/middlewares/validation';
import { Router } from 'express';

const router = Router();

router.post(
  '/create',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.CREATE, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_CREATE }),
  validateBodyMiddleware(CreatePlatformAdminRoleValidation),
  createPlatformAdminRoleController,
);

router.get(
  '/get-all',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_LIST }),
  validateQueryMiddleware(GetAllPlatformAdminRoleQueryValidation),
  getAllPlatformAdminRoleController,
);

router.post(
  '/detail',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_DETAIL }),
  validateBodyMiddleware(DetailPlatformAdminRoleValidation),
  detailPlatformAdminRoleController,
);

router.get(
  '/list-option',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platoform-admin-role', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_LIST_OPTIONS }),
  getListOptionPlatformAdminRoleController,
);

export { router as platformAdminRoleRouter };
