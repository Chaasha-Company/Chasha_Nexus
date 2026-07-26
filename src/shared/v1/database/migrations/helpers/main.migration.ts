import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';

export const migrationLoaderHelper = async (): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      loggerConfig.error('Data Source is not initialized. Run initialize() first.');
      return;
    }
    loggerConfig.info('Running Migrations ... ');
    await AppDataSource.runMigrations();
    loggerConfig.info('Migrations completed successfully.');
  } catch (error: unknown) {
    loggerConfig.error(`Migration Database lost with ${error}`);
  }
};
