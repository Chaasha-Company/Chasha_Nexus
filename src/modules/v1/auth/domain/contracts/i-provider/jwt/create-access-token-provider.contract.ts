import type { BusinessEmployeeAuthTokenPayload, PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';

export type CreateAccessTokenProviderContract = (tokenPayload: PlatformAdminAuthTokenPayload | BusinessEmployeeAuthTokenPayload) => string;
