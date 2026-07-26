import type { ErrorCode } from '@/shared/v1/enums/error-code';

export interface AppError extends Error {
  statusCode?: number;
  errorCode?: ErrorCode;
  details?: unknown;
}
