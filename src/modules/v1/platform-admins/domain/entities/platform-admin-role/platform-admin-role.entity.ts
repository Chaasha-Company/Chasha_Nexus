import type { PlatformAdminRolePermissionsEntity } from './platform-admin-role-permission.entity';
import type { PlatformAdminsEntity } from '../platform-admin.entity';

export interface PlatformAdminRolesEntity {
  platformAdminRoleId: string;
  platformAdminRoleAdmins: PlatformAdminsEntity[];
  platformAdminRolePermissions: PlatformAdminRolePermissionsEntity[];
  platformAdminRoleKey: string;
  platformAdminRoleNameFa: string;
  platformAdminRoleNameEn: string;
  platformAdminRoleDescriptionFa: string | null;
  platformAdminRoleDescriptionEn: string | null;
  platformAdminRoleIsActive: boolean;
  platformAdminRoleCreatedAt: Date;
  platformAdminRoleUpdatedAt: Date;
  platformAdminRoleDeletedAt: Date | null;
}
