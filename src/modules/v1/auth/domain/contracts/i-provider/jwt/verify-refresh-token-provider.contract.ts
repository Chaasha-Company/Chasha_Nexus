import type { BusinessEmployeeAuthTokenPayload, PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';

export type VerifyRefreshTokenProviderContract = (token: string) => string | BusinessEmployeeAuthTokenPayload | PlatformAdminAuthTokenPayload | null;
