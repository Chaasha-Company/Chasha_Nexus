import type { Request, Response } from 'express';
import type multer from 'multer';
import type { ErrorsResponse } from '@/shared/v1/types';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { ValidationMessages, ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { errorResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const multerErrorHandlerHelper = (error: multer.MulterError, req: Request, res: Response): void => {
  const statusCode = HttpStatus.BAD_REQUEST;
  let errorCode;
  let details;

  switch (error.code) {
    case 'LIMIT_PART_COUNT':
      errorCode = ErrorCode.TOO_MANY_PARTS;
      details = {
        error_message: [t(ValidationMessages, ValidationMessage.TOO_MANY_PARTS, req.lang)],
      };
      break;

    case 'LIMIT_FILE_COUNT':
      errorCode = ErrorCode.TOO_MANY_FILES;
      details = {
        error_message: [t(ValidationMessages, ValidationMessage.TOO_MANY_FILES, req.lang)],
      };
      break;

    case 'LIMIT_UNEXPECTED_FILE':
      errorCode = ErrorCode.UNEXPECTED_FILE;
      details = {
        error_message: [t(ValidationMessages, ValidationMessage.UNEXPECTED_FILE, req.lang)],
      };
      break;

    case 'LIMIT_FIELD_KEY':
      errorCode = ErrorCode.FIELD_KEY_TOO_LONG;
      details = {
        error_message: [t(ValidationMessages, ValidationMessage.FIELD_KEY_TOO_LONG, req.lang)],
      };
      break;

    case 'LIMIT_FIELD_VALUE':
      errorCode = ErrorCode.FIELD_VALUE_TOO_LONG;
      details = {
        error_message: [t(ValidationMessages, ValidationMessage.FIELD_VALUE_TOO_LONG, req.lang)],
      };
      break;

    case 'LIMIT_FIELD_COUNT':
      errorCode = ErrorCode.TOO_MANY_FIELDS;
      details = {
        error_message: [t(ValidationMessages, ValidationMessage.TOO_MANY_FIELDS, req.lang)],
      };
      break;

    case 'MISSING_FIELD_NAME':
      errorCode = ErrorCode.MISSING_FIELD_NAME;
      details = {
        error_message: [t(ValidationMessages, ValidationMessage.MISSING_FIELD_NAME, req.lang)],
      };
      break;

    default:
      errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
      details = {
        error_message: [t(ValidationMessages, ValidationMessage.UNEXPECTED_INTERNAL_ERROR, req.lang)],
      };
      break;
  }

  errorResponseHandler<ErrorsResponse>(req, res, statusCode, details, t(ResponseMessages, ResponseMessage.FILE_UPLOAD_FAILED, req.lang), errorCode);
};
