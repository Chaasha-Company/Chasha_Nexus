import type { ZodString } from 'zod';

export interface LoginWithPhoneNumberBusinessRequestDTO {
  loginPhoneNumber: string | ZodString;
  loginPassword: string | ZodString;
}
