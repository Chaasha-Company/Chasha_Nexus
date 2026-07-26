import type { ErrorsResponse, TooManyRequestExceptionProps } from '@/shared/v1/types';
import { ErrorCode, HttpStatus, ResponseMessage } from '@/shared/v1/enums';

export const throwTooManyRequestException = ({
  message = ResponseMessage.TOO_MANY_REQUESTS,
  statusCode = HttpStatus.TOO_MANY_REQUESTS,
  errorCode = ErrorCode.TOO_MANY_REQUESTS,
  details = {},
}: TooManyRequestExceptionProps): Error => {
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
