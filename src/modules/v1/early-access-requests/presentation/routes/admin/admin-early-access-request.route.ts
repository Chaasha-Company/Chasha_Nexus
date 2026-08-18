import { PermissionActionEnum, permissionGuardPlatformAdminMiddleware, PermissionResourceEnum } from '@/modules/v1/authorizations';
import { detailEarlyAccessRequestController, getAllEarlyAccessRequestContoller, getListOptionEarlyAccessController, updateEarlyAccessRequestController } from '@/modules/v1/early-access-requests/presentation/controllers';
import { DetailEarlyAccessRequestValidation, GetAllEarlyAccessRequestQueryValidation, UpdateEarlyAccessRequestValidation } from '@/modules/v1/early-access-requests/presentation/validations';
import { validateBodyMiddleware, validateQueryMiddleware } from '@/shared/v1/middlewares/validation';
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

router.post(
  '/detail',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'early-access-requests', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.EARLY_ACCESS_REQUEST_DETAIL }),
  validateBodyMiddleware(DetailEarlyAccessRequestValidation),
  detailEarlyAccessRequestController,
);

router.patch(
  '/update',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'early-access-requests', platformAdminPermissionAction: PermissionActionEnum.UPDATE, platformAdminPermissionResource: PermissionResourceEnum.EARLY_ACCESS_REQUEST_UPDATE }),
  validateBodyMiddleware(UpdateEarlyAccessRequestValidation),
  updateEarlyAccessRequestController,
);

export { router as adminEarlyAccessRequestRouter };
