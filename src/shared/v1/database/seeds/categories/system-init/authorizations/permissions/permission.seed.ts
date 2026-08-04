import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import { PermissionActionEnum, PermissionTypeEnum } from '@/modules/v1/authorizations/domain';

/**
 * ⚠️ TEST DATA ONLY
 *
 * This seed contains temporary permission data for development/testing purposes.
 * The structure may change in future versions.
 */
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

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Permission Table has Data - Seed Runned !');
    return;
  }

  const permissionData = repository.create(permissions);

  await repository.save(permissionData);

  loggerConfig.info('Permission Table Seed Runned and Data Inserted !');
};
