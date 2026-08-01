import type { BusinessEmployeesEntity } from '@/modules/v1/business-employees';

export interface BusinessEmployeeSessionsEntity {
  businessEmployeeSessionId: string;
  businessEmployeeSessionUserId: string;
  businessEmployeeSessionUser: BusinessEmployeesEntity;
  businessEmployeeSessionRefreshToken: string;
  businessEmployeeSessionIpAddress: string | null;
  businessEmployeeSessionUserAgent: string | null;
  businessEmployeeSessionLastActivityAt: Date | null;
  businessEmployeeSessionExpiresAt: Date;
  businessEmployeeSessionIsActive: boolean;
  businessEmployeeSessionCreatedAt: Date;
  businessEmployeeSessionUpdatedAt: Date;
  businessEmployeeSessionDeletedAt: Date | null;
}
