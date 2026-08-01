import type { PlatformAdminsEntity } from './platform-admin.entity';

export interface PlatformAdminStatusesEntity {
  platformAdminStatusId: number;
  platformAdminStatusNameEn: string;
  platformAdminStatusNameFa: string;
  platformAdminStatusSlug: string;
  platformAdminStatusDescriptionEn: string | null;
  platformAdminStatusDescriptionFa: string | null;
  platformAdminStatusSortOrder: number;
  platformAdminStatusIsSystem: boolean;
  platformAdmins: PlatformAdminsEntity[];
  platformAdminStatusCreatedAt: Date;
  platformAdminStatusUpdatedAt: Date;
  platformAdminStatusDeletedAt: Date | null;
}
