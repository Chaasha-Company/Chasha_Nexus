export interface CreateBusinessEmployeeSessionRequestDTO {
  businessEmployeeSessionId: string;
  businessEmployeeSessionUserId: string;
  businessEmployeeSessionRefreshToken: string;
  businessEmployeeSessionIpAddress: string | null;
  businessEmployeeSessionUserAgent: string | null;
  businessEmployeeSessionLastActivityAt: Date | null;
  businessEmployeeSessionExpiresAt: Date;
}
