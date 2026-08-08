import type { ZodString } from 'zod';

export interface ForgotPasswordBusinessRequestDTO {
  forgotPasswordPhoneNumber: string | ZodString;
}
