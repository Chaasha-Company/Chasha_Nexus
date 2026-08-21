import { Router } from 'express';
import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';
import { permissionGuardBusinessMiddleware } from '../../../middlewares/business/permission-guard-business.middleware';
import { getAllBusinessPermissionController } from '../../../controllers/business/permission/get-all-business-permission.controller';

const router = Router();

router.get(
  '/get-all',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'platform-admin-permission', businessPermissionAction: PermissionActionEnum.READ, businessPermissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_PERMISSION_GET_ALL }),
  getAllBusinessPermissionController,
);

export { router as businessPermissionRouter };
