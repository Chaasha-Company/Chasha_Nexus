import type { NextFunction, Request, Response } from 'express';
import type { ErrorsResponse } from '@/shared/v1/types';
import type { AppError } from '@/shared/v1/interfaces';
import multer from 'multer';

import { ZodError } from 'zod';
import { appErrorObjectCreatorHelper } from './app-error-object-creator.helper';
import { zodErrorObjectCreatorHelper } from './zod-error-object-creator.helper';

import { ErrorCode, HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { errorResponseHandler, multerErrorHandlerHelper } from '@/shared/v1/helpers/api';

const isAppError = (err: unknown): err is AppError =>
  typeof err === 'object' && err !== null && 'message' in err;

export const errorHandlerHelper = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (res.headersSent) {
    return;
  }

  if (err instanceof ZodError) {
    errorResponseHandler<ErrorsResponse>(
      req,
      res,
      HttpStatus.BAD_REQUEST,
      zodErrorObjectCreatorHelper(req, err.issues),
      t(ResponseMessages, ResponseMessage.VALIDATION_ERROR, req.lang),
      ErrorCode.VALIDATION_ERROR,
    );
    return;
  }

  if (err instanceof multer.MulterError) {
    multerErrorHandlerHelper(err, req, res);
    return;
  }

  if (isAppError(err)) {
    errorResponseHandler<ErrorsResponse>(
      req,
      res,
      err.statusCode ?? 500,
      appErrorObjectCreatorHelper(req, err),
      err.message,
      err.errorCode ?? ErrorCode.INTERNAL_SERVER_ERROR,
    );
    return;
  }

  // Unknown Error
  errorResponseHandler<null>(
    req,
    res,
    HttpStatus.INTERNAL_SERVER_ERROR,
    null,
    t(ResponseMessages, ResponseMessage.UNKNOWN_ERROR, req.lang),
    ErrorCode.INTERNAL_SERVER_ERROR,
  );
};
