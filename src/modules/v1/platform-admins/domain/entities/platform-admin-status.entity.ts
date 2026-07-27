import type { PlatformAdminsEntity } from './platform-admin.entity';

export interface PlatformAdminStatusesEntity {
  platformAdminStatusId: string;
  platformAdminStatusName: string;
  platformAdminStatusSlug: string;
  platformAdminStatusDescription: string | null;
  platformAdminStatusSortOrder: number;
  platformAdminStatusIsSystem: boolean;
  platformAdmins: PlatformAdminsEntity[];
  platformAdminStatusCreatedAt: Date;
  platformAdminStatusUpdatedAt: Date;
  platformAdminStatusDeletedAt: Date | null;
}
