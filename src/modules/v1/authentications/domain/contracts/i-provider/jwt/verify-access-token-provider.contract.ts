import type { BusinessEmployeeAuthTokenPayload, PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';

export type VerifyAccessTokenProviderContract = (token: string) => string | BusinessEmployeeAuthTokenPayload | PlatformAdminAuthTokenPayload | null;
