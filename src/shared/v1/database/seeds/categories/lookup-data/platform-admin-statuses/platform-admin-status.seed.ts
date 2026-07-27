import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminStatusesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const createPlatformAdminStatusDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(PlatformAdminStatusesModel);

  const platformAdminStatusesData = [
    {
      platformAdminStatusName: 'فعال',
      platformAdminStatusSlug: 'active',
      platformAdminStatusDescription: 'ادمین پلتفرم فعال است',
      platformAdminStatusSortOrder: 1,
      platformAdminStatusIsSystem: true,
    },
    {
      platformAdminStatusName: 'غیرفعال',
      platformAdminStatusSlug: 'inactive',
      platformAdminStatusDescription: 'ادمین پلتفرم غیرفعال است',
      platformAdminStatusSortOrder: 2,
      platformAdminStatusIsSystem: true,
    },
    {
      platformAdminStatusName: 'تعلیق شده',
      platformAdminStatusSlug: 'suspended',
      platformAdminStatusDescription: 'دسترسی ادمین پلتفرم متوقف شده است',
      platformAdminStatusSortOrder: 3,
      platformAdminStatusIsSystem: true,
    },
  ];

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Platform Admin Statuses Table has Data - Seed Runned !');

    return;
  }

  await repository.insert(platformAdminStatusesData);

  loggerConfig.info('Platform Admin Statuses Table has no Data - Seed Runned and Data insert !');
};
