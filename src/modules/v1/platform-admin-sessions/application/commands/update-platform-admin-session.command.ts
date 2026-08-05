import type { AtLeastOne } from '@/shared/v1/types/other';

export type UpdatePlatformAdminSessionCommand = AtLeastOne<{
  platformAdminSessionId: string;
  platformAdminSessionRefreshToken?: string;
  platformAdminSessionIpAddress?: string | null;
  platformAdminSessionUserAgent?: string | null;
  platformAdminSessionLastActivityAt?: Date | null;
  platformAdminSessionRevokedAt?: Date | null;
  platformAdminSessionExpiresAt?: Date;
  platformAdminSessionIsActive?: boolean;
}>;
