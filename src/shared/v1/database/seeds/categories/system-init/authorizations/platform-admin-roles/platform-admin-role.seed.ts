// TODO: This seed contains temporary test data.
// Replace final authorization strategy.

import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins';

export const createPlatformAdminRoleDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(PlatformAdminRolesModel);

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Platform Admin Roles Table has Data - Seed Skipped!');
    return;
  }

  const platformAdminRoles = [
    {
      platformAdminRoleKey: 'super_admin',
      platformAdminRoleNameFa: 'مدیر کل',
      platformAdminRoleNameEn: 'Super Admin',
      platformAdminRoleDescriptionFa: 'دسترسی کامل به تمام بخش‌های سیستم',
      platformAdminRoleDescriptionEn: 'Full access to all system resources',
      platformAdminRoleIsActive: true,
    },
    {
      platformAdminRoleKey: 'admin',
      platformAdminRoleNameFa: 'مدیر سیستم',
      platformAdminRoleNameEn: 'Admin',
      platformAdminRoleDescriptionFa: 'مدیریت بخش‌های عمومی سیستم',
      platformAdminRoleDescriptionEn: 'Manage general system resources',
      platformAdminRoleIsActive: true,
    },
    {
      platformAdminRoleKey: 'support',
      platformAdminRoleNameFa: 'پشتیبانی',
      platformAdminRoleNameEn: 'Support',
      platformAdminRoleDescriptionFa: 'دسترسی برای پشتیبانی کاربران و کسب‌وکارها',
      platformAdminRoleDescriptionEn: 'Support access for users and businesses',
      platformAdminRoleIsActive: true,
    },
  ];

  const roles = repository.create(platformAdminRoles);

  await repository.save(roles);

  loggerConfig.info('Platform Admin Roles Table has no Data - Seed Runned and Data Inserted!');
};
