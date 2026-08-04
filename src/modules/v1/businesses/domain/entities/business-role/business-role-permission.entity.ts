import type { PermissionsEntity } from '@/modules/v1/authorizations/domain/entities/permission';
import type { BusinessRolesEntity } from './business-role.entity';

export interface BusinessRolePermissionsEntity {
  businessRolePermissionId: string;
  businessRolePermissionBusinessRoleId: string;
  businessRolePermissionBusinessRole: BusinessRolesEntity;
  businessRolePermissionPermissionId: string;
  businessRolePermissionPermission: PermissionsEntity;
  businessRolePermissionCreatedAt: Date;
  businessRolePermissionUpdatedAt: Date;
  businessRolePermissionDeletedAt: Date | null;
}
