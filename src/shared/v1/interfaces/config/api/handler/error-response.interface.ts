import type { ErrorCode } from '@/shared/v1/enums/error-code';

export interface ApiErrorResponse<T = unknown> {
  success: false;
  status: number;
  author: string;
  message: string;
  errorCode: ErrorCode;
  errors: T | null;
  timeStamp: Date;
  version: string;
}
