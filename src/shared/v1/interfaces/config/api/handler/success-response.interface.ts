export interface ApiSuccessResponse<T = unknown> {
  success: true;
  status: number;
  author: string;
  message: string;
  data: T | null;
  timeStamp: Date;
  version: string;
}
