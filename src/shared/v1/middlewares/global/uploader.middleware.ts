import multer, { type Multer, type MulterError } from 'multer';
import type { Request } from 'express';
import multers3 from 'multer-s3';
import { EnvValueConfig } from '@/config/env';
import { s3Config } from '@/infrastructure/storage-system/arvan-cloud';
import { randomUUID } from 'crypto';
import { fileFilterHelper } from '@/shared/v1/helpers';

export const uploaderMiddleware = (
  folder: string,
  allowedTypes: string[],
  limitFileSize: number,
  isPublicFile: boolean,
): Multer => {
  const storage = multers3({
    bucket: EnvValueConfig.ARVAN_BUCKET_NAME,
    s3: s3Config,
    acl: isPublicFile ? 'public-read' : 'private',
    key(
      _req: Express.Request,
      _file: Express.Multer.File,
      cb: (_error: MulterError | null, _key?: string) => void,
    ) {
      const fullPath = `${folder}/${Date.now()}-${randomUUID()}-@KARA`;
      cb(null, fullPath);
    },
  });

  return multer({
    storage,
    limits: { fileSize: limitFileSize },
    fileFilter(_req: Request, file: Express.Multer.File, cb) {
      fileFilterHelper(_req, file, cb, allowedTypes);
    },
  });
};
