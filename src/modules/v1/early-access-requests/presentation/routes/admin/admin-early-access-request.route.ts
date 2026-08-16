import { PermissionActionEnum, permissionGuardPlatformAdminMiddleware, PermissionResourceEnum } from '@/modules/v1/authorizations';
import { getAllEarlyAccessRequestContoller, getListOptionEarlyAccessController } from '@/modules/v1/early-access-requests/presentation/controllers';
import { GetAllEarlyAccessRequestQueryValidation } from '@/modules/v1/early-access-requests/presentation/validations';
import { validateQueryMiddleware } from '@/shared/v1/middlewares/validation';
import { Router } from 'express';

const router = Router();

router.get(
  '/list-option',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'early-access-requests', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.EARLY_ACCESS_REQUEST_LIST_OPTIONS }),
  getListOptionEarlyAccessController,
);

router.get(
  '/get-all',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'early-access-requests', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.EARLY_ACCESS_REQUEST_GET_ALL }),
  validateQueryMiddleware(GetAllEarlyAccessRequestQueryValidation),
  getAllEarlyAccessRequestContoller,
);

export { router as adminEarlyAccessRequestRouter };
