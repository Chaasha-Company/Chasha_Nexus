import type { LogoutBusinessQuery } from '../logout-business.query';
import { updateBusinessEmployeeSessionRepository } from '@/modules/v1/business-employee-sessions/infrastructure';

export const logoutBusinessQueryHandler = async (logoutData: LogoutBusinessQuery): Promise<void> => {
  await updateBusinessEmployeeSessionRepository()({
    businessEmployeeSessionId: logoutData.auth_token_session_id,
    businessEmployeeSessionRevokedAt: new Date(),
  });
};
