import type { Response, Request } from 'express';
import type { ApiSuccessResponse } from '@/shared/v1/interfaces';

import { ResponseMessage, HttpStatus } from '@/shared/v1/enums';

import { EnvValueConfig } from '@/config/env';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const successResponseHandler = <T>(
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<ApiSuccessResponse<T>>,
  status: HttpStatus,
  data?: T,
  message: string = t(ResponseMessages, ResponseMessage.SUCCESS, req.lang),
  author = 'Kara_Company',
): Response<ApiSuccessResponse<T>> =>
  res.status(status).json({
    status,
    success: true,
    author,
    message,
    data: data ?? null,
    timeStamp: new Date(),
    version: EnvValueConfig.APP_VERSION,
  });
