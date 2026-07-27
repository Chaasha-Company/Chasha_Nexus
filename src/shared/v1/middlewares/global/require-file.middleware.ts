import type { Request, Response, NextFunction } from 'express';
import { ErrorCode, ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { ResponseMessages, ValidationMessages, t } from '@/infrastructure/translator-system/i18n';
import { throwBadRequestException } from '@/shared/v1/exceptions';

export const requiredFileMiddleware =
  (fieldName: string) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    let hasFile = req.file !== undefined && req.file !== null;

    if (!hasFile && req.files !== undefined && req.files !== null) {
      if (Array.isArray(req.files)) {
        hasFile = req.files.length > 0;
      } else {
        const fieldFiles = req.files[fieldName];

        if (fieldFiles === undefined || fieldFiles === null) {
          hasFile = false;
        } else if (Array.isArray(fieldFiles)) {
          hasFile = fieldFiles.length > 0;
        } else {
          hasFile = true;
        }
      }
    }

    if (!hasFile) {
      throwBadRequestException({
        message: t(ResponseMessages, ResponseMessage.FILE_UPLOAD_FAILED, req.lang),
        errorCode: ErrorCode.FILE_REQUIRED,
        details: {
          errorMessage: [t(ValidationMessages, ValidationMessage.FILE_REQUIRED, req.lang)],
          field: [fieldName],
        },
      });
    }

    next();
  };
