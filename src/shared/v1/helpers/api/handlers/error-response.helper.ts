import type { Response, Request } from 'express';
import type { ApiErrorResponse } from '@/shared/v1/interfaces';

import { ResponseMessage, HttpStatus, ErrorCode } from '@/shared/v1/enums';

import { EnvValueConfig } from '@/config/env';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const errorResponseHandler = <T>(
  req: Request,
  res: Response<ApiErrorResponse<T>>,
  status: HttpStatus,
  errors?: T,
  message: string = t(ResponseMessages, ResponseMessage.SUCCESS, req.lang),
  error_code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
  author = 'Kara_Company',
): Response<ApiErrorResponse<T>> =>
  res.status(status).json({
    status,
    success: false,
    author,
    message,
    errorCode: error_code,
    errors: errors ?? null,
    timeStamp: new Date(),
    version: EnvValueConfig.APP_VERSION,
  });
