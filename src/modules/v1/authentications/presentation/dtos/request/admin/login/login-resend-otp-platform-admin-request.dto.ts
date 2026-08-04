import type { ZodString } from 'zod';

export interface LoginResendOtpPlatformAdminRequestDTO {
  loginResendOtpPhoneNumber: string | ZodString;
  loginResendOtpSessionId: string | ZodString;
}
