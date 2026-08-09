import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth/token';

export type LogoutBusinessQuery = Pick<BusinessEmployeeAuthTokenPayload, 'auth_token_session_id'>;
