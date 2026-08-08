import type { ZodString } from 'zod';

export interface ForgotPasswordVerifyBusinessRequestDTO {
  forgotPasswordVerifyResetToken: string | ZodString;
  forgotPasswordVerifyNewPassword: string | ZodString;
}
