import type { PlatformAdminSessionsEntity } from './platform-admin-session.entity';
import type { PlatformAdminStatusesEntity } from './platform-admin-status.entity';

export interface PlatformAdminsEntity {
  platformAdminId: string;
  platformAdminStatusId: string;
  platformAdminStatus: PlatformAdminStatusesEntity;
  platformAdminSessions: PlatformAdminSessionsEntity[];
  platformAdminResetPasswordCode: string;
  platformAdminFirstName: string;
  platformAdminLastName: string;
  platformAdminPhoneNumber: string;
  platformAdminPassword: string;
  platformAdminIsPhoneVerified: boolean;
  platformAdminLastLoginAt: Date | null;
  platformAdminCreatedAt: Date;
  platformAdminUpdatedAt: Date;
  platformAdminDeletedAt: Date | null;
}
