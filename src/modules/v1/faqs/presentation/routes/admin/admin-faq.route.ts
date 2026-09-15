import { PermissionActionEnum, permissionGuardPlatformAdminMiddleware, PermissionResourceEnum } from '@/modules/v1/authorizations';
import { createAdminFaqController, deleteAdminFaqController, detailAdminFaqController, getAllAdminFaqController, getListOptionAdminFaqController, updateAdminFaqController } from '@/modules/v1/faqs/presentation/controllers';
import { CreateAdminFaqValidation, DeleteAdminFaqValidation, DetailAdminFaqValidation, GetAllAdminFaqQueryValidation, UpdateAdminFaqValidation } from '@/modules/v1/faqs/presentation/validations';
import { validateBodyMiddleware, validateQueryMiddleware } from '@/shared/v1/middlewares/validation';
import { Router } from 'express';

const router = Router();

router.get(
  '/list-option',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.FAQ_LIST_OPTIONS }),
  getListOptionAdminFaqController,
);

router.get(
  '/get-all',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.FAQ_GET_ALL }),
  validateQueryMiddleware(GetAllAdminFaqQueryValidation),
  getAllAdminFaqController,
);

router.post(
  '/detail',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.FAQ_DETAIL }),
  validateBodyMiddleware(DetailAdminFaqValidation),
  detailAdminFaqController,
);

router.post(
  '/create',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq', platformAdminPermissionAction: PermissionActionEnum.CREATE, platformAdminPermissionResource: PermissionResourceEnum.FAQ_CREATE }),
  validateBodyMiddleware(CreateAdminFaqValidation),
  createAdminFaqController,
);

router.post(
  '/delete',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq', platformAdminPermissionAction: PermissionActionEnum.DELETE, platformAdminPermissionResource: PermissionResourceEnum.FAQ_DELETE }),
  validateBodyMiddleware(DeleteAdminFaqValidation),
  deleteAdminFaqController,
);

router.patch(
  '/patch',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq', platformAdminPermissionAction: PermissionActionEnum.UPDATE, platformAdminPermissionResource: PermissionResourceEnum.FAQ_UPDATE }),
  validateBodyMiddleware(UpdateAdminFaqValidation),
  updateAdminFaqController,
);

export { router as adminFaqRouter };
