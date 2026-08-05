import type { PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';
import { updatePlatformAdminSessionRepository } from '@/modules/v1/platform-admin-sessions';

export const logoutPlatformAdminQueryHandler = async (logoutData: Pick<PlatformAdminAuthTokenPayload, 'auth_token_session_id'>): Promise<void> => {
  await updatePlatformAdminSessionRepository()({
    platformAdminSessionId: logoutData.auth_token_session_id,
    platformAdminSessionRevokedAt: new Date(),
  });
};
