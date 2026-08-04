import type { ZodString } from 'zod';

export interface RefreshTokenBusinessRequestDTO {
  refreshTokenBusiness: string | ZodString;
}
