import type { BusinessEmployeeAuthTokenPayload } from './business-employee-auth-token.type';
import type { PlatformAdminAuthTokenPayload } from './platform-admin-auth-token.type';

export type AuthTokenPayload = BusinessEmployeeAuthTokenPayload | PlatformAdminAuthTokenPayload;
