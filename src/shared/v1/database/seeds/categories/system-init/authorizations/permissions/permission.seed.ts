import { loggerConfig } from '@/config/logger';
import { PermissionActionEnum, PermissionResourceEnum, PermissionSubjectEnum, PermissionTypeEnum } from '@/modules/v1/authorizations/domain';
import { AppDataSource } from '@/shared/v1/database/core';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';

export const createPermissionDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(PermissionsModel);

  const permissions = [
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
