// TODO: This seed contains temporary authorization data.
// Replace with final authorization strategy.

import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import { PermissionActionEnum, PermissionTypeEnum } from '@/modules/v1/authorizations/domain';

export const createPermissionDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(PermissionsModel);

  const permissions = [
    {
      permissionKey: 'orders.page',
      permissionVersion: 1,
      permissionModule: 'orders',
      permissionAction: PermissionActionEnum.READ,
      permissionType: PermissionTypeEnum.PAGE,
      permissionLabelFa: 'صفحه سفارشات',
      permissionLabelEn: 'Orders Page',
      permissionDescriptionFa: 'دسترسی به صفحه سفارشات',
      permissionDescriptionEn: 'Access to orders page',
      permissionNavigation: {
        permissionNavigationVisible: true,
        permissionNavigationGroupKey: 'orders',
        permissionNavigationGroupLabelFa: 'سفارشات',
        permissionNavigationGroupLabelEn: 'Orders',
        permissionNavigationParentKey: null,
        permissionNavigationLabelFa: 'سفارشات',
        permissionNavigationLabelEn: 'Orders',
        permissionNavigationPath: '/orders',
        permissionNavigationIcon: 'shopping-cart',
        permissionNavigationOrder: 1,
      },
    },
    {
      permissionKey: 'orders.create',
      permissionVersion: 1,
      permissionModule: 'orders',
      permissionAction: PermissionActionEnum.CREATE,
      permissionType: PermissionTypeEnum.ACTION,
      permissionLabelFa: 'ایجاد سفارش',
      permissionLabelEn: 'Create Order',
      permissionDescriptionFa: 'ایجاد سفارش جدید',
      permissionDescriptionEn: 'Create new order',
      permissionNavigation: null,
    },
    {
      permissionKey: 'orders.delete',
      permissionVersion: 1,
      permissionModule: 'orders',
      permissionAction: PermissionActionEnum.DELETE,
      permissionType: PermissionTypeEnum.ACTION,
      permissionLabelFa: 'حذف سفارش',
      permissionLabelEn: 'Delete Order',
      permissionDescriptionFa: 'حذف سفارش',
      permissionDescriptionEn: 'Delete order',
      permissionNavigation: null,
    },
  ];

  for (const permission of permissions) {
    const existsPermission = await repository.findOne({
      where: {
        permissionKey: permission.permissionKey,
      },
    });

    if (existsPermission) {
      await repository.update(
        {
          permissionKey: permission.permissionKey,
        },
        {
          ...permission,
        },
      );

      continue;
    }

    await repository.save(repository.create(permission));
  }

  loggerConfig.info('Permission Table has no Data - Seed Runned and Data insert !');
};
