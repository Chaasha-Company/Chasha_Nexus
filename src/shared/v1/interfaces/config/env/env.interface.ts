export interface EnvInterface {
  // =========================App Info=========================
  APP_NAME: string;
  APP_URL: string;
  APP_INSTAGRAM_LINK: string;
  APP_LINKDIN_LINK: string;
  APP_X_LINK: string;
  APP_DESCRIPTION: string;
  APP_VERSION: string;

  // =========================Kara Info=========================
  KARA_LEGAL_NAME: string;
  KARA_TRADE_NAME: string;
  KARA_REGISTRATION_NUMBER: number;
  KARA_TAX_NUMBER: number;
  KARA_NATIONAL_ID: number;

  // =========================Chasha Info =========================
  CHASHA_LEGAL_NAME: string;
  CHASHA_TRADE_NAME: string;
  CHASHA_REGISTRATION_NUMBER: number;
  CHASHA_TAX_NUMBER: number;
  CHASHA_NATIONAL_ID: number;

  // =========================Rate Limiting=========================
  API_RATE_LIMIT_WINDOW: number;
  API_RATE_LIMIT_MAX: number;

  // =========================Environment=========================
  NODE_ENV: string;
  PORT: number;
  LOG_LEVEL: string;

  // =========================Swagger / API Docs=========================
  OPEN_API_ENABLED: boolean;
  OPEN_API_URL: string;

  // =========================Database Connection=========================
  DATABASE_DIALECT: string;
  DATABASE_LOGGING: boolean;

  // ---- Master Database (Write Operations) ----
  DATABASE_MASTER_HOST: string;
  DATABASE_MASTER_PORT: number;
  DATABASE_MASTER_USER: string;
  DATABASE_MASTER_PASSWORD: string;
  DATABASE_MASTER_NAME: string;
  DATABASE_MASTER_URL: string;

  // ---- Replica Database (Read Operations) ----
  DATABASE_REPLICA_HOST: string;
  DATABASE_REPLICA_PORT: number;
  DATABASE_REPLICA_USER: string;
  DATABASE_REPLICA_PASSWORD: string;
  DATABASE_REPLICA_NAME: string;

  // ---- Connection Pooling Settings ----
  DB_POOL_MASTER_CONNECTION_LIMIT: number;
  DB_POOL_REPLICA_CONNECTION_LIMIT: number;
  DB_POOL_QUEUE_LIMIT: number;

  // ---- Security & Timeout ----
  DATABASE_SSL: boolean;
  DATABASE_CONNECTION_TIMEOUT: number;
  DATABASE_QUERY_TIMEOUT: number;

  // =========================MeliPayamak Auth=========================
  MELI_PAYAMAK_API_URL: string;
  MELI_PAYAMAK_API_KEY: string;
  MELI_PAYAMAK_USERNAME: string;
  MELI_PAYAMAK_PASSWORD: string;
  MELI_PAYAMAK_BASE_NUMBER: number;

  // =========================Message Broker - RabbitMq =========================
  RABBITMQ_USER: string;
  RABBITMQ_URL: string;
  RABBITMQ_DEFAULT_PASS: string;

  // =========================ArvanCloud Client=========================
  ARVAN_ENDPOINT: string;
  ARVAN_ACCESS_KEY: string;
  ARVAN_SECRET_KEY: string;
  ARVAN_BUCKET_NAME: string;

  // =========================Auth Front=========================
  BCRYPT_SALT: number;
  JWT_REFRESH_TOKEN_SECRET_KEY: string;
  JWT_ACCESS_TOKEN_SECRET_KEY: string;
  JWT_REFRESH_TOKEN_EXPIRES_AT: number;
  JWT_ACCESS_TOKEN_EXPIRES_AT: number;

  // =========================Platform Admin Authentication=========================
  PLATFORM_ADMIN_LOGIN_WITH_PHONE_OTP_EXPIRES_IN_SECONDS: number;
  PLATFORM_ADMIN_LOGIN_SESSION_EXPIRES_IN_SECONDS: number;
}
