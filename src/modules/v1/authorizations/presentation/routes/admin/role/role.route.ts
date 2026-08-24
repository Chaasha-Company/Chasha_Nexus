import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';
import {
  assignPlatformAdminRolePermissionController,
  createPlatformAdminRoleController,
  deletePlatformAdminRoleController,
  detailPlatformAdminRoleController,
  getAllPlatformAdminRoleController,
  getListOptionPlatformAdminRoleController,
  removePlatformAdminRolePermissionController,
  updatePlatformAdminRoleController,
} from '@/modules/v1/authorizations/presentation/controllers';
import { permissionGuardPlatformAdminMiddleware } from '@/modules/v1/authorizations/presentation/middlewares';
import {
  AssignPlatformAdminRolePermissionValidation,
  CreatePlatformAdminRoleValidation,
  DeletePlatformAdminRoleValidation,
  DetailPlatformAdminRoleValidation,
  GetAllPlatformAdminRoleQueryValidation,
  RemovePlatformAdminRolePermissionValidation,
  UpdatePlatformAdminRoleValidation,
} from '@/modules/v1/authorizations/presentation/validations';
import { validateBodyMiddleware, validateQueryMiddleware } from '@/shared/v1/middlewares/validation';
import { Router } from 'express';

const router = Router();

router.post(
  '/create',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.CREATE, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_CREATE }),
  validateBodyMiddleware(CreatePlatformAdminRoleValidation),
  createPlatformAdminRoleController,
);

router.patch(
  '/update',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.UPDATE, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_UPDATE }),
  validateBodyMiddleware(UpdatePlatformAdminRoleValidation),
  updatePlatformAdminRoleController,
);

router.get(
  '/get-all',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_LIST }),
  validateQueryMiddleware(GetAllPlatformAdminRoleQueryValidation),
  getAllPlatformAdminRoleController,
);

router.post(
  '/delete',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.DELETE, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_DELETE }),
  validateBodyMiddleware(DeletePlatformAdminRoleValidation),
  deletePlatformAdminRoleController,
);

router.post(
  '/assign-permission',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.CREATE, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_ASSIGN_PERMISSION }),
  validateBodyMiddleware(AssignPlatformAdminRolePermissionValidation),
  assignPlatformAdminRolePermissionController,
);

router.post(
  '/remove-permission',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-role', platformAdminPermissionAction: PermissionActionEnum.DELETE, platformAdminPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_REMOVE_PERMISSION }),
  validateBodyMiddleware(RemovePlatformAdminRolePermissionValidation),
  removePlatformAdminRolePermissionController,
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
