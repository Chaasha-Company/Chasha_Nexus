import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminsModel, PlatformAdminStatusesModel } from '@/shared/v1/database/schema/platform_admins';

export const createPlatformAdminSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(PlatformAdminsModel);
  const platformAdminStatusRepository = AppDataSource.getRepository(PlatformAdminStatusesModel);

  const status = await platformAdminStatusRepository.findOne({
    where: {
      platformAdminStatusSlug: 'active',
    },
  });

  const platformAdmin = {
    platformAdminStatusId: status?.platformAdminStatusId as number,
    platformAdminFirstName: 'عرفان',
    platformAdminLastName: 'ابویی مهریزی',
    platformAdminPhoneNumber: '09393929968',
    platformAdminPassword: 'erfan123456',
    platformAdminIsPhoneVerified: true,
    platformAdminLastLoginAt: new Date(),
  };

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Platform Admin Table has Data - Seed Runned !');
    return;
  }

  const platformAdminData = repository.create(platformAdmin);

  await repository.save(platformAdminData);

  loggerConfig.info('Platform Admin Table has no Data - Seed Runned and Data insert !');
};
