import type { ErrorsResponse, UnAuthorizedExceptionProps } from '@/shared/v1/types';
import { ErrorCode, HttpStatus, ResponseMessage } from '@/shared/v1/enums';

export const throwUnAuthorizedException = ({ message = ResponseMessage.FORBIDDEN, statusCode = HttpStatus.FORBIDDEN, errorCode = ErrorCode.FORBIDDEN, details = {} }: UnAuthorizedExceptionProps): Error => {
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
