import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';

export const seedLoaderHelper = async (): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      loggerConfig.error('Data Source is not initialized. Run initialize() first.');
      return;
    }
  } catch (error: unknown) {
    loggerConfig.error(`Seeding Database lost with ${error}`);
  }
};
