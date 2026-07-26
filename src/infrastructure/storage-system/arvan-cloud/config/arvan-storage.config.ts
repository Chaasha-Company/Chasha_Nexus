import { EnvValueConfig } from '@/config/env';
import { S3Client } from '@aws-sdk/client-s3';

export const s3Config = new S3Client({
  region: 'default',
  endpoint: EnvValueConfig.ARVAN_ENDPOINT,
  credentials: {
    accessKeyId: EnvValueConfig.ARVAN_ACCESS_KEY,
    secretAccessKey: EnvValueConfig.ARVAN_SECRET_KEY,
  },
});
