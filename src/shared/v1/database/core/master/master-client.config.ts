import type { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions.js';
import { EnvValueConfig } from '@/config/env';

export const masterDatabase = (): MysqlConnectionCredentialsOptions => ({
  host: EnvValueConfig.DATABASE_MASTER_HOST,
  port: EnvValueConfig.DATABASE_MASTER_PORT,
  username: EnvValueConfig.DATABASE_MASTER_USER,
  password: EnvValueConfig.DATABASE_MASTER_PASSWORD,
  database: EnvValueConfig.DATABASE_MASTER_NAME,
  // @ts-expect-error - Module exports structure mismatch
  extra: {
    charset: 'utf8mb4',
    connectionLimit: EnvValueConfig.DB_POOL_MASTER_CONNECTION_LIMIT,
    queueLimit: EnvValueConfig.DB_POOL_QUEUE_LIMIT,
  },
});
