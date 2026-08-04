import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { createBusinessEmployeeStatusDataSeed, createBusinessTypeDataSeed, createEarlyAccessStatusDataSeed, createPermissionDataSeed, createPlatformAdminStatusDataSeed } from '@/shared/v1/database/seeds/categories';

export const seedLoaderHelper = async (): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      loggerConfig.error('Data Source is not initialized. Run initialize() first.');
      return;
    }
    await createPlatformAdminStatusDataSeed();
    await createBusinessEmployeeStatusDataSeed();
    // await createPlatformAdminDataSeed();
    await createBusinessTypeDataSeed();
    await createEarlyAccessStatusDataSeed();
    await createPermissionDataSeed();
  } catch (error: unknown) {
    loggerConfig.error(`Seeding Database lost with ${error}`);
  }
};
