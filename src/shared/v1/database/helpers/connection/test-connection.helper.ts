import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';

export const testDatabaseConnectionHelper = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    loggerConfig.info('Data Source Initialized.');

    const masterQueryRunner = AppDataSource.createQueryRunner('master');
    await masterQueryRunner.connect();

    const [masterQueryResult] = await masterQueryRunner.query('SELECT 1+1 as success');
    loggerConfig.info(`Master DB Connected Successfully | Query Result ${masterQueryResult}`);
    await masterQueryRunner.release();

    const replicaQueryRunner = AppDataSource.createQueryRunner('slave');
    await replicaQueryRunner.connect();

    const [replicaQueryResult] = await replicaQueryRunner.query('SELECT 1+1 as success');
    loggerConfig.info(`Replicas DB Connected Successfully | Query Result ${replicaQueryResult}`);
    await replicaQueryRunner.release();
  } catch (error: unknown) {
    loggerConfig.error(`Testing Database Connection lost with ${error}`);
  }
};
