import type { PlatformAdminsEntity } from './platform-admin.entity';

export interface PlatformAdminSessionsEntity {
  platformAdminSessionId: string;
  platformAdminSessionUserId: string;
  platformAdminSessionUser: PlatformAdminsEntity;
  platformAdminSessionRefreshToken: string;
  platformAdminSessionIpAddress: string | null;
  platformAdminSessionUserAgent: string | null;
  platformAdminSessionLastActivityAt: Date | null;
  platformAdminSessionExpiresAt: Date;
  platformAdminSessionIsActive: boolean;
  platformAdminSessionCreatedAt: Date;
  platformAdminSessionUpdatedAt: Date;
  platformAdminSessionDeletedAt: Date | null;
}
