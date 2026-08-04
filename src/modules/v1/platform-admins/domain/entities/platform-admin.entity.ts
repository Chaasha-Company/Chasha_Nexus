import type { PlatformAdminSessionsEntity } from '@/modules/v1/platform-admin-sessions';
import type { PlatformAdminRolesEntity } from './platform-admin-role/platform-admin-role.entity';
import type { PlatformAdminStatusesEntity } from './platform-admin-status.entity';

export interface PlatformAdminsEntity {
  platformAdminId: string;
  platformAdminStatusId: number;
  platformAdminStatus: PlatformAdminStatusesEntity;
  platformAdminRoleId: string;
  platformAdminRole: PlatformAdminRolesEntity;
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
