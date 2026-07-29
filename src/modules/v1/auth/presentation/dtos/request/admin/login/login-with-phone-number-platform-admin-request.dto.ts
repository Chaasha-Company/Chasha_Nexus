import type { ZodString } from 'zod';

export interface LoginWithPhoneNumberPlatformAdminRequestDTO {
  loginPhoneNumber: string | ZodString;
  loginPassword: string | ZodString;
}
