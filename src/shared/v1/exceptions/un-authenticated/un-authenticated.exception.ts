import type { ErrorsResponse, UnAuthenticatedExceptionProps } from '@/shared/v1/types';
import { ErrorCode, HttpStatus, ResponseMessage } from '@/shared/v1/enums';

export const throwUnAuthenticatedException = ({
  message = ResponseMessage.UNAUTHORIZED,
  statusCode = HttpStatus.UNAUTHORIZED,
  errorCode = ErrorCode.UNAUTHORIZED,
  details = {},
}: UnAuthenticatedExceptionProps): Error => {
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
