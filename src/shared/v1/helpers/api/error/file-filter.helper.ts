import type { Request } from 'express';
import type { FileFilterCallback } from 'multer';
import { ErrorCode, ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { ResponseMessages, ValidationMessages, t } from '@/infrastructure/translator-system/i18n';
import { throwBadRequestException } from '@/shared/v1/exceptions';

export const fileFilterHelper = (
  req: Request,
  file: Express.Multer.File,
  callBack: FileFilterCallback,
  allowedTypes: string[],
): void => {
  const fileType = file.mimetype.split('/')[1];

  if (allowedTypes.includes(fileType) === false) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.FILE_TYPE_NOT_ALLOWED, req.lang),
      errorCode: ErrorCode.FILE_TYPE_NOT_ALLOWED,
      details: {
        errorMessage: [t(ValidationMessages, ValidationMessage.FILE_TYPE_NOT_ALLOWED, req.lang)],
        fileTypeError: [fileType],
        allowedFileType: allowedTypes,
      },
    });
  }

  return callBack(null, true);
};
