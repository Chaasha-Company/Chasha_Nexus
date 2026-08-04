import type { PermissionsEntity } from '@/modules/v1/authorizations/domain/entities/permission';
import type { PlatformAdminRolesEntity } from './platform-admin-role.entity';

export interface PlatformAdminRolePermissionsEntity {
  platformAdminRolePermissionId: string;
  platformAdminRolePermissionRoleId: string;
  platformAdminRolePermissionRole: PlatformAdminRolesEntity;
  platformAdminRolePermissionPermissionId: string;
  platformAdminRolePermissionPermission: PermissionsEntity;
  platformAdminRolePermissionCreatedAt: Date;
  platformAdminRolePermissionUpdatedAt: Date;
  platformAdminRolePermissionDeletedAt: Date | null;
}
