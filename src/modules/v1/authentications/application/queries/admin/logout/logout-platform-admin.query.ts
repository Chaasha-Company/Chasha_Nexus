import type { PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';

export type LogoutPlatformAdminQuery = Pick<PlatformAdminAuthTokenPayload, 'auth_token_session_id'>;
