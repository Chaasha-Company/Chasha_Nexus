import type { ErrorsResponse, RequestConflictExceptionProps } from '@/shared/v1/types';
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
