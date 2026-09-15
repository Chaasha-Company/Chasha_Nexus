import { PermissionActionEnum, permissionGuardPlatformAdminMiddleware, PermissionResourceEnum } from '@/modules/v1/authorizations';
import { createAdminFaqTypeController, deleteAdminFaqTypeController, detailAdminFaqTypeController, getAllAdminFaqTypeController, getListOptionAdminFaqTypeController, updateAdminFaqTypeController } from '@/modules/v1/faqs/presentation/controllers';
import { CreateAdminFaqTypeValidation, DeleteAdminFaqTypeValidation, DetailAdminFaqTypeValidation, GetAllAdminFaqTypeQueryValidation, UpdateAdminFaqTypeValidation } from '@/modules/v1/faqs/presentation/validations';
import { validateBodyMiddleware, validateQueryMiddleware } from '@/shared/v1/middlewares/validation';
import { Router } from 'express';

const router = Router();

router.get(
  '/list-option',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq-type', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.FAQ_TYPE_LIST_OPTIONS }),
  getListOptionAdminFaqTypeController,
);

router.get(
  '/get-all',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq-type', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.FAQ_TYPE_GET_ALL }),
  validateQueryMiddleware(GetAllAdminFaqTypeQueryValidation),
  getAllAdminFaqTypeController,
);

router.post(
  '/detail',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq-type', platformAdminPermissionAction: PermissionActionEnum.READ, platformAdminPermissionResource: PermissionResourceEnum.FAQ_TYPE_DETAIL }),
  validateBodyMiddleware(DetailAdminFaqTypeValidation),
  detailAdminFaqTypeController,
);

router.post(
  '/create',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq-type', platformAdminPermissionAction: PermissionActionEnum.CREATE, platformAdminPermissionResource: PermissionResourceEnum.FAQ_TYPE_CREATE }),
  validateBodyMiddleware(CreateAdminFaqTypeValidation),
  createAdminFaqTypeController,
);

router.post(
  '/delete',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq-type', platformAdminPermissionAction: PermissionActionEnum.DELETE, platformAdminPermissionResource: PermissionResourceEnum.FAQ_TYPE_DELETE }),
  validateBodyMiddleware(DeleteAdminFaqTypeValidation),
  deleteAdminFaqTypeController,
);

router.patch(
  '/patch',
  permissionGuardPlatformAdminMiddleware({ platformAdminPermissionModule: 'platform-admin-faq-type', platformAdminPermissionAction: PermissionActionEnum.UPDATE, platformAdminPermissionResource: PermissionResourceEnum.FAQ_TYPE_UPDATE }),
  validateBodyMiddleware(UpdateAdminFaqTypeValidation),
  updateAdminFaqTypeController,
);

export { router as adminFaqTypeRouter };
