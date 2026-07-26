import { EnvValueConfig } from '@/config/env';
import { replica1Database } from '@/shared/v1/database/core/1-replica';
import { masterDatabase } from '@/shared/v1/database/core/master';
import { DataSource } from 'typeorm';
import { CasbinRule } from 'typeorm-adapter';

const isProduction = EnvValueConfig.NODE_ENV === 'production';
export const AppDataSource: DataSource = new DataSource({
  type: EnvValueConfig.DATABASE_DIALECT as 'mysql',

  replication: {
    master: masterDatabase(),
    slaves: [replica1Database()],
  },

  poolSize: EnvValueConfig.DB_POOL_MASTER_CONNECTION_LIMIT,

  entities: [CasbinRule],
  migrations: [
    `${isProduction ? 'shared/v1/database/migrations/*.js' : 'src/shared/v1/database/migrations/*.ts'}`,
  ],
  synchronize: false,
  logging: EnvValueConfig.DATABASE_LOGGING,
  logger: 'file',
});
