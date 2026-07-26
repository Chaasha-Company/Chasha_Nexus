import type { ErrorCode } from '@/shared/v1/enums/error-code';
import type { ErrorsResponse } from '@/shared/v1/types/config';

export interface UnAuthenticatedExceptionProps {
  message?: string;
  statusCode?: number;
  errorCode?: ErrorCode;
  details?: ErrorsResponse;
}
