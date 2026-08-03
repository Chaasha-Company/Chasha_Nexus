export interface CreatePlatformAdminSessionCommand {
  platformAdminSessionId: string;
  platformAdminSessionUserId: string;
  platformAdminSessionRefreshToken: string;
  platformAdminSessionIpAddress: string | null;
  platformAdminSessionUserAgent: string | null;
  platformAdminSessionLastActivityAt: Date | null;
  platformAdminSessionExpiresAt: Date;
}
