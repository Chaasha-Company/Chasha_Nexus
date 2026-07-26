import pino from 'pino';

import { transportOptions } from './transports';

import { EnvValueConfig } from '@/config/env';

export const loggerConfig = pino({
  customLevels: {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  },
  transport: transportOptions,
  level: EnvValueConfig.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    app: EnvValueConfig.APP_NAME,
    version: EnvValueConfig.APP_VERSION,
  },
});
