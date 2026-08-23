import { loggerConfig } from '@/config/logger';
import { PermissionActionEnum, PermissionResourceEnum, PermissionSubjectEnum, PermissionTypeEnum } from '@/modules/v1/authorizations/domain';
import { AppDataSource } from '@/shared/v1/database/core';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';

export const createPermissionDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(PermissionsModel);

  const permissions = [
    // =========================Early Access Requests - Page Permissions=========================
    {
      permissionKey: 'early-access-requests.page.read',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.EARLY_ACCESS_REQUEST_PAGE,
      permissionVersion: 1,
      permissionModule: 'early-access-requests',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.PAGE,

      permissionLabelFa: 'صفحه درخواست‌های دسترسی زودهنگام',
      permissionLabelEn: 'Early Access Requests Page',

      permissionDescriptionFa: 'دسترسی به صفحه درخواست‌های دسترسی زودهنگام',
      permissionDescriptionEn: 'Access to the early access requests page',

      permissionNavigation: {
        permissionNavigationVisible: true,
        permissionNavigationGroupKey: 'early-access',
        permissionNavigationGroupLabelFa: 'دسترسی زودهنگام',
        permissionNavigationGroupLabelEn: 'Early Access',
        permissionNavigationParentKey: null,
        permissionNavigationLabelFa: 'درخواست‌های دسترسی زودهنگام',
        permissionNavigationLabelEn: 'Early Access Requests',
        permissionNavigationPath: '/early-access-request/list',
        permissionNavigationIcon: 'list',
        permissionNavigationOrder: 1,
      },
    },

    // =========================Early Access Requests - Read Permissions=========================
    {
      permissionKey: 'early-access-requests.get-all.read',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.EARLY_ACCESS_REQUEST_GET_ALL,
      permissionVersion: 1,
      permissionModule: 'early-access-requests',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.ACTION,

      permissionLabelFa: 'دریافت درخواست‌های دسترسی زودهنگام',
      permissionLabelEn: 'Get All Early Access Requests',

      permissionDescriptionFa: 'دسترسی به API دریافت درخواست‌های دسترسی زودهنگام',
      permissionDescriptionEn: 'Access to the get all early access requests API',

      permissionNavigation: null,
    },

    {
      permissionKey: 'early-access-requests.list-options.read',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.EARLY_ACCESS_REQUEST_LIST_OPTIONS,
      permissionVersion: 1,
      permissionModule: 'early-access-requests',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.ACTION,

      permissionLabelFa: 'دریافت گزینه‌های لیست درخواست‌های دسترسی زودهنگام',
      permissionLabelEn: 'Get Early Access Request List Options',

      permissionDescriptionFa: 'دسترسی به API دریافت گزینه‌های موردنیاز لیست درخواست‌های دسترسی زودهنگام',
      permissionDescriptionEn: 'Access to the early access request list options API',

      permissionNavigation: null,
    },

    {
      permissionKey: 'early-access-requests.detail.read',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.EARLY_ACCESS_REQUEST_DETAIL,
      permissionVersion: 1,
      permissionModule: 'early-access-requests',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.ACTION,

      permissionLabelFa: 'دریافت جزئیات درخواست دسترسی زودهنگام',
      permissionLabelEn: 'Get Early Access Request Detail',

      permissionDescriptionFa: 'دسترسی به API دریافت جزئیات یک درخواست دسترسی زودهنگام',
      permissionDescriptionEn: 'Access to the early access request detail API',

      permissionNavigation: null,
    },

    // =========================Early Access Requests - Mutation Permissions=========================
    {
      permissionKey: 'early-access-requests.update.update',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.EARLY_ACCESS_REQUEST_UPDATE,
      permissionVersion: 1,
      permissionModule: 'early-access-requests',
      permissionAction: PermissionActionEnum.UPDATE,
      permissionType: PermissionTypeEnum.ACTION,

      permissionLabelFa: 'بروزرسانی درخواست دسترسی زودهنگام',
      permissionLabelEn: 'Update Early Access Request',

      permissionDescriptionFa: 'دسترسی به API بروزرسانی یک درخواست دسترسی زودهنگام',
      permissionDescriptionEn: 'Access to the early access request update API',

      permissionNavigation: null,
    },

    // =========================Authorization System - Permission Management=========================
    {
      permissionKey: 'authz.permission.get-all.read',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_PERMISSION_GET_ALL,
      permissionVersion: 1,
      permissionModule: 'platform-admin-permission',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.ACTION,

      permissionLabelFa: 'دریافت لیست پرمیشن‌های ادمین',
      permissionLabelEn: 'Get All Admin Permissions',

      permissionDescriptionFa: 'دسترسی به API دریافت لیست پرمیشن‌های ادمین بر اساس رول',
      permissionDescriptionEn: 'Access to the API for retrieving admin permissions by role id',

      permissionNavigation: null,
    },
    {
      permissionKey: 'authz.permission.get-all.read',
      permissionSubject: PermissionSubjectEnum.BUSINESS_EMPLOYEE,
      permissionResource: PermissionResourceEnum.BUSINESS_EMPLOYEE_AUTHZ_PERMISSION_GET_ALL,
      permissionVersion: 1,
      permissionModule: 'business-employee-permission',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.ACTION,

      permissionLabelFa: 'دریافت لیست پرمیشن‌های کارمند بیزنس',
      permissionLabelEn: 'Get All Business Employee Permissions',

      permissionDescriptionFa: 'دسترسی به API دریافت لیست پرمیشن‌های کارمند بیزنس بر اساس رول',
      permissionDescriptionEn: 'Access to the API for retrieving business employee permissions by role id',

      permissionNavigation: null,
    },

    // =========================Authorization System - Platform Admin Role Management=========================
    {
      permissionKey: 'authz.platform-admin-role.page.read',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_PAGE,
      permissionVersion: 1,
      permissionModule: 'platform-admin-role',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.PAGE,
      permissionLabelFa: 'صفحه مدیریت نقش های ادمین',
      permissionLabelEn: 'Platform Admin Roles Page',
      permissionDescriptionFa: 'دسترسی به صفحه مدیریت نقش های ادمین',
      permissionDescriptionEn: 'Access to the platform admin roles management page',
      permissionNavigation: {
        permissionNavigationVisible: true,
        permissionNavigationGroupKey: 'authorization',
        permissionNavigationGroupLabelFa: 'مجوزها و دسترسی‌ها',
        permissionNavigationGroupLabelEn: 'Authorization',
        permissionNavigationParentKey: null,
        permissionNavigationLabelFa: 'نقش های ادمین',
        permissionNavigationLabelEn: 'Admin Roles',
        permissionNavigationPath: '/authz/role/list',
        permissionNavigationIcon: 'shield',
        permissionNavigationOrder: 1,
      },
    },
    {
      permissionKey: 'authz.platform-admin-role.list-options.read',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_LIST_OPTIONS,
      permissionVersion: 1,
      permissionModule: 'platform-admin-role',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.ACTION,
      permissionLabelFa: 'دریافت گزینه‌های لیست نقش های ادمین',
      permissionLabelEn: 'Get Platform Admin Role List Options',
      permissionDescriptionFa: 'دسترسی به API دریافت گزینه‌های موردنیاز لیست نقش های ادمین',
      permissionDescriptionEn: 'Access to the platform admin role list options API',
      permissionNavigation: null,
    },
    {
      permissionKey: 'authz.platform-admin-role.list.read',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_LIST,
      permissionVersion: 1,
      permissionModule: 'platform-admin-role',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.ACTION,
      permissionLabelFa: 'دریافت لیست نقش های ادمین',
      permissionLabelEn: 'Get Platform Admin Role List',
      permissionDescriptionFa: 'دسترسی به API دریافت لیست نقش های ادمین',
      permissionDescriptionEn: 'Access to the platform admin role list API',
      permissionNavigation: null,
    },
    {
      permissionKey: 'authz.platform-admin-role.detail.read',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_DETAIL,
      permissionVersion: 1,
      permissionModule: 'platform-admin-role',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.ACTION,
      permissionLabelFa: 'دریافت جزئیات نقش ادمین',
      permissionLabelEn: 'Get Platform Admin Role Detail',
      permissionDescriptionFa: 'دسترسی به API دریافت جزئیات یک نقش ادمین',
      permissionDescriptionEn: 'Access to the platform admin role detail API',
      permissionNavigation: null,
    },
    {
      permissionKey: 'authz.platform-admin-role.create.create',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_CREATE,
      permissionVersion: 1,
      permissionModule: 'platform-admin-role',
      permissionAction: PermissionActionEnum.CREATE,
      permissionType: PermissionTypeEnum.ACTION,
      permissionLabelFa: 'ایجاد نقش ادمین',
      permissionLabelEn: 'Create Platform Admin Role',
      permissionDescriptionFa: 'دسترسی به API ایجاد نقش ادمین',
      permissionDescriptionEn: 'Access to the platform admin role creation API',
      permissionNavigation: null,
    },
    {
      permissionKey: 'authz.platform-admin-role.update.update',
      permissionSubject: PermissionSubjectEnum.PLATFORM_ADMIN,
      permissionResource: PermissionResourceEnum.PLATFORM_ADMIN_AUTHZ_ROLE_UPDATE,
      permissionVersion: 1,
      permissionModule: 'platform-admin-role',
      permissionAction: PermissionActionEnum.UPDATE,
      permissionType: PermissionTypeEnum.ACTION,
      permissionLabelFa: 'بروزرسانی نقش ادمین',
      permissionLabelEn: 'Update Platform Admin Role',
      permissionDescriptionFa: 'دسترسی به API بروزرسانی نقش ادمین',
      permissionDescriptionEn: 'Access to the platform admin role update API',
      permissionNavigation: null,
    },
  ];

  for (const permission of permissions) {
    const existingPermission = await repository.findOne({
      where: {
        permissionKey: permission.permissionKey,
      },
    });

    if (existingPermission) {
      await repository.update(
        {
          permissionKey: permission.permissionKey,
        },
        permission,
      );

      continue;
    }

    await repository.save(repository.create(permission));
  }

  loggerConfig.info('Permission seed completed successfully.');
};
