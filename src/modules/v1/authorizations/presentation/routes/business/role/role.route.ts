import { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';
import {
  assignBusinessRolePermissionController,
  createBusinessRoleController,
  deleteBusinessRoleController,
  detailBusinessRoleController,
  getAllBusinessRoleController,
  getBusinessRolePermissionsController,
  getListOptionBusinessRoleController,
  removeBusinessRolePermissionController,
  replaceBusinessRolePermissionsController,
  updateBusinessRoleController,
  updateBusinessRolePermissionController,
} from '@/modules/v1/authorizations/presentation/controllers';
import { permissionGuardBusinessMiddleware } from '@/modules/v1/authorizations/presentation/middlewares';
import {
  AssignBusinessRolePermissionValidation,
  CreateBusinessRoleValidation,
  DeleteBusinessRoleValidation,
  DetailBusinessRoleValidation,
  GetAllBusinessRoleQueryValidation,
  GetBusinessRolePermissionsQueryValidation,
  RemoveBusinessRolePermissionValidation,
  ReplaceBusinessRolePermissionsValidation,
  UpdateBusinessRolePermissionValidation,
  UpdateBusinessRoleValidation,
} from '@/modules/v1/authorizations/presentation/validations';
import { validateBodyMiddleware, validateQueryMiddleware } from '@/shared/v1/middlewares/validation';
import { Router } from 'express';

const router = Router();

router.post(
  '/create',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'business-employee-role', businessPermissionAction: PermissionActionEnum.CREATE, businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_CREATE }),
  validateBodyMiddleware(CreateBusinessRoleValidation),
  createBusinessRoleController,
);

router.patch(
  '/update',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'business-employee-role', businessPermissionAction: PermissionActionEnum.UPDATE, businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_UPDATE }),
  validateBodyMiddleware(UpdateBusinessRoleValidation),
  updateBusinessRoleController,
);

router.get(
  '/get-all',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'business-employee-role', businessPermissionAction: PermissionActionEnum.READ, businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_LIST }),
  validateQueryMiddleware(GetAllBusinessRoleQueryValidation),
  getAllBusinessRoleController,
);

router.post(
  '/delete',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'business-employee-role', businessPermissionAction: PermissionActionEnum.DELETE, businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_DELETE }),
  validateBodyMiddleware(DeleteBusinessRoleValidation),
  deleteBusinessRoleController,
);

router.post(
  '/assign-permission',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'business-employee-role', businessPermissionAction: PermissionActionEnum.CREATE, businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_ASSIGN_PERMISSION }),
  validateBodyMiddleware(AssignBusinessRolePermissionValidation),
  assignBusinessRolePermissionController,
);

router.post(
  '/remove-permission',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'business-employee-role', businessPermissionAction: PermissionActionEnum.DELETE, businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_REMOVE_PERMISSION }),
  validateBodyMiddleware(RemoveBusinessRolePermissionValidation),
  removeBusinessRolePermissionController,
);

router.get(
  '/get-all-permissions',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'business-employee-role', businessPermissionAction: PermissionActionEnum.READ, businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_GET_PERMISSIONS }),
  validateQueryMiddleware(GetBusinessRolePermissionsQueryValidation),
  getBusinessRolePermissionsController,
);

router.put(
  '/replace-permissions',
  permissionGuardBusinessMiddleware({
    businessPermissionModule: 'business-employee-role',
    businessPermissionAction: PermissionActionEnum.UPDATE,
    businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_REPLACE_PERMISSIONS,
  }),
  validateBodyMiddleware(ReplaceBusinessRolePermissionsValidation),
  replaceBusinessRolePermissionsController,
);

router.patch(
  '/update-permission',
  permissionGuardBusinessMiddleware({
    businessPermissionModule: 'business-employee-role',
    businessPermissionAction: PermissionActionEnum.UPDATE,
    businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_UPDATE_PERMISSION,
  }),
  validateBodyMiddleware(UpdateBusinessRolePermissionValidation),
  updateBusinessRolePermissionController,
);

router.post(
  '/detail',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'business-employee-role', businessPermissionAction: PermissionActionEnum.READ, businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_DETAIL }),
  validateBodyMiddleware(DetailBusinessRoleValidation),
  detailBusinessRoleController,
);

router.get(
  '/list-option',
  permissionGuardBusinessMiddleware({ businessPermissionModule: 'business-employee-role', businessPermissionAction: PermissionActionEnum.READ, businessPermissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_ROLE_LIST_OPTIONS }),
  getListOptionBusinessRoleController,
);

export { router as businessRoleRouter };
