import type { ZodString } from 'zod';

export interface LoginVerifyPlatformAdminRequestDTO {
  loginVerifySessionId: string | ZodString;
  loginVerifyPhoneNumber: string | ZodString;
  loginVerifyOtp: string | ZodString;
}
