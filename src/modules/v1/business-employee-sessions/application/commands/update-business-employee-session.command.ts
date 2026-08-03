import type { AtLeastOne } from '@/shared/v1/types/other';

export type UpdateBusinessEmployeeSessionCommand = AtLeastOne<{
  businessEmployeeSessionId: string;
  businessEmployeeSessionRefreshToken?: string;
  businessEmployeeSessionIpAddress?: string | null;
  businessEmployeeSessionUserAgent?: string | null;
  businessEmployeeSessionLastActivityAt?: Date | null;
  businessEmployeeSessionExpiresAt?: Date;
  businessEmployeeSessionIsActive?: boolean;
}>;
