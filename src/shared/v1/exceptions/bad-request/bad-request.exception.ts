import type { BadRequestExceptionProps } from '@/shared/v1/types/exception/bad-request';
import type { ErrorsResponse } from '@/shared/v1/types/config';
import { ErrorCode, HttpStatus, ResponseMessage } from '@/shared/v1/enums';

export const throwBadRequestException = ({ message = ResponseMessage.ERROR, statusCode = HttpStatus.BAD_REQUEST, errorCode = ErrorCode.BAD_REQUEST, details = {} }: BadRequestExceptionProps): Error => {
  const error = new Error(message) as Error & {
    statusCode: number;
    errorCode: ErrorCode;
    details: ErrorsResponse;
  };

  error.statusCode = statusCode;
  error.errorCode = errorCode;
  error.details = details;

  throw error;
};
