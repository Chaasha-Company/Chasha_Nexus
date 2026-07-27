export interface CreatePlatformAdminSessionRequestDTO {
  platformAdminSessionUserId: string;
  platformAdminSessionRefreshToken: string;
  platformAdminSessionIpAddress: string | null;
  platformAdminSessionUserAgent: string | null;
  platformAdminSessionLastActivityAt: Date | null;
  platformAdminSessionExpiresAt: string;
}
