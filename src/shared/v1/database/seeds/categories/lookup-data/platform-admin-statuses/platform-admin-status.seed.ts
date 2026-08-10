import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminStatusesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export const createPlatformAdminStatusDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(PlatformAdminStatusesModel);

  const platformAdminStatusesData = [
    {
      platformAdminStatusNameEn: 'Active',
      platformAdminStatusNameFa: 'فعال',
      platformAdminStatusSlug: 'active',
      platformAdminStatusDescriptionEn: 'Platform administrator account is active and has full access.',
      platformAdminStatusDescriptionFa: 'ادمین پلتفرم فعال است و دسترسی کامل دارد.',
      platformAdminStatusSortOrder: 1,
      platformAdminStatusIsSystem: true,
    },
    {
      platformAdminStatusNameEn: 'Inactive',
      platformAdminStatusNameFa: 'غیرفعال',
      platformAdminStatusSlug: 'inactive',
      platformAdminStatusDescriptionEn: 'Platform administrator account is inactive and cannot access the platform.',
      platformAdminStatusDescriptionFa: 'ادمین پلتفرم غیرفعال است و دسترسی به سیستم ندارد.',
      platformAdminStatusSortOrder: 2,
      platformAdminStatusIsSystem: true,
    },
    {
      platformAdminStatusNameEn: 'Suspended',
      platformAdminStatusNameFa: 'تعلیق شده',
      platformAdminStatusSlug: 'suspended',
      platformAdminStatusDescriptionEn: 'Platform administrator access has been temporarily suspended.',
      platformAdminStatusDescriptionFa: 'دسترسی ادمین پلتفرم به صورت موقت متوقف شده است.',
      platformAdminStatusSortOrder: 3,
      platformAdminStatusIsSystem: true,
    },
  ];

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Platform Admin Statuses Table has Data - Seed Skipped!');

    return;
  }

  await repository.upsert(platformAdminStatusesData, {
    conflictPaths: ['platformAdminStatusSlug'],
    skipUpdateIfNoValuesChanged: true,
  });

  loggerConfig.info('Platform Admin Statuses Table Seed Completed Successfully!');
};
