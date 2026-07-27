import type { EnvInterface } from '@/shared/v1/interfaces/config/env';
import { envLoaderBootstrapConfig } from './env-loader.config';
import { getBooleanEnvHelper, getNumberEnvHelper, getStringEnvHelper } from '@/shared/v1/helpers/config/env';

void envLoaderBootstrapConfig();

export const EnvValueConfig: EnvInterface = {
  // =========================App Info=========================
  APP_NAME: getStringEnvHelper('APP_NAME', ''),
  APP_URL: getStringEnvHelper('APP_URL', ''),
  APP_INSTAGRAM_LINK: getStringEnvHelper('APP_INSTAGRAM_LINK', ''),
  APP_LINKDIN_LINK: getStringEnvHelper('APP_LINKDIN_LINK', ''),
  APP_X_LINK: getStringEnvHelper('APP_X_LINK', ''),
  APP_DESCRIPTION: getStringEnvHelper('APP_DESCRIPTION', ''),
  APP_VERSION: getStringEnvHelper('APP_VERSION', ''),

  // =========================Kara Info=========================
  KARA_LEGAL_NAME: getStringEnvHelper('KARA_LEGAL_NAME', ''),
  KARA_TRADE_NAME: getStringEnvHelper('KARA_TRADE_NAME', ''),
  KARA_REGISTRATION_NUMBER: getNumberEnvHelper('KARA_REGISTRATION_NUMBER', 0),
  KARA_TAX_NUMBER: getNumberEnvHelper('KARA_TAX_NUMBER', 0),
  KARA_NATIONAL_ID: getNumberEnvHelper('KARA_NATIONAL_ID', 0),

  // =========================Rate Limiting=========================
  API_RATE_LIMIT_WINDOW: getNumberEnvHelper('API_RATE_LIMIT_WINDOW', 0),
  API_RATE_LIMIT_MAX: getNumberEnvHelper('API_RATE_LIMIT_MAX', 1),

  // =========================Environment=========================
  NODE_ENV: getStringEnvHelper('NODE_ENV', 'production'),
  PORT: getNumberEnvHelper('PORT', 3000),
  LOG_LEVEL: getStringEnvHelper('LOG_LEVEL', ''),

  // =========================Swagger / API Docs=========================
  OPEN_API_ENABLED: getBooleanEnvHelper('OPEN_API_ENABLED', true),
  OPEN_API_URL: getStringEnvHelper('OPEN_API_URL', '/api-docs'),

  // =========================Database Connection=========================
  DATABASE_DIALECT: getStringEnvHelper('DATABASE_DIALECT', ''),
  DATABASE_LOGGING: getBooleanEnvHelper('DATABASE_LOGGING', false),

  // ---- Master Database (Write Operations)----
  DATABASE_MASTER_HOST: getStringEnvHelper('DATABASE_MASTER_HOST', ''),
  DATABASE_MASTER_PORT: getNumberEnvHelper('DATABASE_MASTER_PORT', 0),
  DATABASE_MASTER_USER: getStringEnvHelper('DATABASE_MASTER_USER', ''),
  DATABASE_MASTER_PASSWORD: getStringEnvHelper('DATABASE_MASTER_PASSWORD', ''),
  DATABASE_MASTER_NAME: getStringEnvHelper('DATABASE_MASTER_NAME', ''),
  DATABASE_MASTER_URL: getStringEnvHelper('DATABASE_MASTER_URL', ''),

  // ----Replica Database(Read Operations)----
  DATABASE_REPLICA_HOST: getStringEnvHelper('DATABASE_REPLICA_HOST', ''),
  DATABASE_REPLICA_PORT: getNumberEnvHelper('DATABASE_REPLICA_PORT', 0),
  DATABASE_REPLICA_USER: getStringEnvHelper('DATABASE_REPLICA_USER', ''),
  DATABASE_REPLICA_PASSWORD: getStringEnvHelper('DATABASE_REPLICA_PASSWORD', ''),
  DATABASE_REPLICA_NAME: getStringEnvHelper('DATABASE_REPLICA_NAME', ''),

  // ----Connection Pooling Settings----
  DB_POOL_MASTER_CONNECTION_LIMIT: getNumberEnvHelper('DB_POOL_MASTER_CONNECTION_LIMIT', 0),
  DB_POOL_REPLICA_CONNECTION_LIMIT: getNumberEnvHelper('DB_POOL_REPLICA_CONNECTION_LIMIT', 0),
  DB_POOL_QUEUE_LIMIT: getNumberEnvHelper('DB_POOL_QUEUE_LIMIT', 0),

  // ----Security & Timeout----
  DATABASE_SSL: getBooleanEnvHelper('DATABASE_SSL', false),
  DATABASE_CONNECTION_TIMEOUT: getNumberEnvHelper('DATABASE_CONNECTION_TIMEOUT', 0),
  DATABASE_QUERY_TIMEOUT: getNumberEnvHelper('DATABASE_QUERY_TIMEOUT', 0),

  // =========================MeliPayamak Auth=========================
  MELI_PAYAMAK_API_URL: getStringEnvHelper('MELI_PAYAMAK_API_URL', ''),
  MELI_PAYAMAK_API_KEY: getStringEnvHelper('MELI_PAYAMAK_API_KEY', ''),
  MELI_PAYAMAK_USERNAME: getStringEnvHelper('MELI_PAYAMAK_USERNAME', ''),
  MELI_PAYAMAK_PASSWORD: getStringEnvHelper('MELI_PAYAMAK_PASSWORD', ''),
  MELI_PAYAMAK_BASE_NUMBER: getNumberEnvHelper('MELI_PAYAMAK_BASE_NUMBER', 0),

  // =========================Message Broker - RabbitMq=========================
  RABBITMQ_USER: getStringEnvHelper('RABBITMQ_USER', ''),
  RABBITMQ_URL: getStringEnvHelper('RABBITMQ_URL', 'amqp://guest:guest@rabbitmq:5672'),
  RABBITMQ_DEFAULT_PASS: getStringEnvHelper('RABBITMQ_DEFAULT_PASS', ''),

  // =========================ArvanCloud Client=========================
  ARVAN_ENDPOINT: getStringEnvHelper('ARVAN_ENDPOINT', ''),
  ARVAN_ACCESS_KEY: getStringEnvHelper('ARVAN_ACCESS_KEY', ''),
  ARVAN_SECRET_KEY: getStringEnvHelper('ARVAN_SECRET_KEY', ''),
  ARVAN_BUCKET_NAME: getStringEnvHelper('ARVAN_BUCKET_NAME', ''),

  // =========================Auth Front=========================
  BCRYPT_SALT: getNumberEnvHelper('BCRYPT_SALT', 0),
  JWT_REFRESH_TOKEN_SECRET_KEY: getStringEnvHelper('JWT_REFRESH_TOKEN_SECRET_KEY', ''),
  JWT_ACCESS_TOKEN_SECRET_KEY: getStringEnvHelper('JWT_ACCESS_TOKEN_SECRET_KEY', ''),
  JWT_REFRESH_TOKEN_EXPIRES_AT: getNumberEnvHelper('JWT_REFRESH_TOKEN_EXPIRES_AT', 0),
  JWT_ACCESS_TOKEN_EXPIRES_AT: getNumberEnvHelper('JWT_ACCESS_TOKEN_EXPIRES_AT', 0),
};
