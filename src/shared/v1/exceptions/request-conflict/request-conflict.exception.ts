import type { RequestConflictExceptionProps } from '@/shared/v1/types/exception/request-conflict';
import type { ErrorsResponse } from '@/shared/v1/types/config';
import { ErrorCode, HttpStatus, ResponseMessage } from '@/shared/v1/enums';

export const throwRequestConflictException = ({ message = ResponseMessage.DATA_CONFLICT, statusCode = HttpStatus.CONFLICT, errorCode = ErrorCode.DATA_CONFLICT, details = {} }: RequestConflictExceptionProps): Error => {
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
