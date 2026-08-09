import type { LogoutPlatformAdminQuery } from '../logout-platform-admin.query';
import { updatePlatformAdminSessionRepository } from '@/modules/v1/platform-admin-sessions';

export const logoutPlatformAdminQueryHandler = async (logoutData: LogoutPlatformAdminQuery): Promise<void> => {
  await updatePlatformAdminSessionRepository()({
    platformAdminSessionId: logoutData.auth_token_session_id,
    platformAdminSessionRevokedAt: new Date(),
  });
};
