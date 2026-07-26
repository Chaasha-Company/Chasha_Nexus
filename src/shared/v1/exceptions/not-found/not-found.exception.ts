import type { ErrorsResponse, NotFoundExceptionProps } from '@/shared/v1/types';
import { ErrorCode, HttpStatus, ResponseMessage } from '@/shared/v1/enums';

export const throwNotFoundException = ({
  message = ResponseMessage.NOT_FOUND,
  statusCode = HttpStatus.NOT_FOUND,
  errorCode = ErrorCode.NOT_FOUND,
  details = {},
}: NotFoundExceptionProps): Error => {
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
