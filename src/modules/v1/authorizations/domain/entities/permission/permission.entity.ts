import type { PermissionActionEnum, PermissionResourceEnum, PermissionSubjectEnum, PermissionTypeEnum } from '@/modules/v1/authorizations/domain/enums';
import type { PermissionNavigationEntity } from '@/modules/v1/authorizations/domain/value-objects';
import type { BusinessRolePermissionsEntity } from '@/modules/v1/businesses';

export interface PermissionsEntity {
  permissionId: string;
  permissionKey: string;
  permissionVersion: number;
  permissionModule: string;
  permissionBusinessRolePermissions: BusinessRolePermissionsEntity[];
  permissionAction: PermissionActionEnum;
  permissionType: PermissionTypeEnum;
  permissionSubject: PermissionSubjectEnum;
  PermissionResource: PermissionResourceEnum;
  permissionLabelFa: string;
  permissionLabelEn: string;
  permissionDescriptionFa: string | null;
  permissionDescriptionEn: string | null;
  permissionNavigation: PermissionNavigationEntity | null;
  permissionIsActive: boolean;
  permissionCreatedAt: Date;
  permissionUpdatedAt: Date;
  permissionDeletedAt: Date | null;
}
