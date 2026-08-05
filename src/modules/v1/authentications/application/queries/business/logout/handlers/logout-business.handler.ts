import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth/token';
import { updateBusinessEmployeeSessionRepository } from '@/modules/v1/business-employee-sessions/infrastructure/repositories/update-business-employee-session.repository';

export const logoutBusinessQueryHandler = async (logoutData: Pick<BusinessEmployeeAuthTokenPayload, 'auth_token_session_id'>): Promise<void> => {
  await updateBusinessEmployeeSessionRepository()({
    businessEmployeeSessionId: logoutData.auth_token_session_id,
    businessEmployeeSessionRevokedAt: new Date(),
  });
};
