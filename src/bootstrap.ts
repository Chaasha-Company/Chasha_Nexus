import { createChashaApplication } from './app';

import { EnvValueConfig } from '@/config/env';
import { testDatabaseConnectionHelper } from '@/shared/v1/database/helpers/connection';
import { migrationLoaderHelper } from '@/shared/v1/database/migrations/helpers';
import { seedLoaderHelper } from '@/shared/v1/database/seeds';
import { geoIpDatabaseInitConfig } from '@/infrastructure/location-system/geo-ip';
import { casbinAuthInitConfig } from '@/infrastructure/auth-system/casbin';
// import {
//   rabbitMqServerConfig,
//   consumerLoaderBorker,
// } from '@/infrastructure/messaging-system';

export const bootstrap = async (): Promise<void> => {
  const app = createChashaApplication();

  await testDatabaseConnectionHelper();
  await migrationLoaderHelper();
  await seedLoaderHelper();
  await geoIpDatabaseInitConfig();
  await casbinAuthInitConfig();
  // await rabbitMqServerConfig();
  // await consumerLoaderBorker();

  app.listen(EnvValueConfig.PORT);
};
