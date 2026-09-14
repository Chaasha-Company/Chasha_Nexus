import type { Request, Response } from 'express';

import type { ApiSuccessResponse, PaginationOptions, PaginationResponse } from '@/shared/v1/interfaces/config/api/handler';

import { EnvValueConfig } from '@/config/env';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const paginationResponseHandler = <T>(
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response<ApiSuccessResponse<PaginationResponse<T>>>,
  status: HttpStatus,
  data: T[],
  pagination: PaginationOptions,
  message: string = t(ResponseMessages, ResponseMessage.SUCCESS, req.lang),
  author = 'Mehkam_Company',
): Response<ApiSuccessResponse<PaginationResponse<T>>> => {
  const totalPages = Math.ceil(pagination.paginationTotalItems / pagination.paginationLimit);

  return res.status(status).json({
    status,
    success: true,
    author,
    message,
    data: {
      paginationItems: data,
      paginationMeta: {
        paginationMetaPage: pagination.paginationPage,
        paginationMetaLimit: pagination.paginationLimit,
        paginationMetaTotalItems: pagination.paginationTotalItems,
        paginationMetaTotalPages: totalPages,
        paginationMetaHasNextPage: pagination.paginationPage < totalPages,
        paginationMetaHasPreviousPage: pagination.paginationPage > 1,
      },
    },
    timeStamp: new Date(),
    version: EnvValueConfig.APP_VERSION,
  });
};
