import type { PlatformAdminsEntity } from '@/modules/v1/platform-admins';

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
