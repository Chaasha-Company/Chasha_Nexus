import type { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions.js';
import { EnvValueConfig } from '@/config/env';

export const replica1Database = (): MysqlConnectionCredentialsOptions => ({
  host: EnvValueConfig.DATABASE_REPLICA_HOST,
  port: EnvValueConfig.DATABASE_REPLICA_PORT,
  username: EnvValueConfig.DATABASE_REPLICA_USER,
  password: EnvValueConfig.DATABASE_REPLICA_PASSWORD,
  database: EnvValueConfig.DATABASE_REPLICA_NAME,
  // @ts-expect-error - Module exports structure mismatch
  extra: {
    charset: 'utf8mb4',
    connectionLimit: EnvValueConfig.DB_POOL_REPLICA_CONNECTION_LIMIT,
    queueLimit: EnvValueConfig.DB_POOL_QUEUE_LIMIT,
  },
});
