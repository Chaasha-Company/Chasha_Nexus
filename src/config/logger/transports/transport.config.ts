import { type TransportMultiOptions } from 'pino';
import { EnvValueConfig } from '@/config/env';

// in the future i add a diffrent transport option ( use sentry instead )

const isProduction = EnvValueConfig.NODE_ENV === 'production';
export const transportOptions: TransportMultiOptions | undefined = isProduction
  ? {
      targets: [
        {
          target: 'pino/file',
          options: {
            destination: './logs/app.log',
            mkdir: true,
            sync: false,
          },
        },
      ],
    }
  : {
      targets: [
        {
          target: 'pino/file',
          options: {
            destination: './logs/app.log',
            mkdir: true,
            sync: false,
          },
        },
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        },
      ],
    };
