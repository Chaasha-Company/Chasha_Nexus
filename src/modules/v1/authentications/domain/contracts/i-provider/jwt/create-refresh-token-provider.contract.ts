import type { BusinessEmployeeAuthTokenPayload, PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';

export type CreateRefreshTokenProviderContract = (tokenPayload: PlatformAdminAuthTokenPayload | BusinessEmployeeAuthTokenPayload) => string;
