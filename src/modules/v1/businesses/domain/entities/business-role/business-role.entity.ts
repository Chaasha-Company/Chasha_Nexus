import type { BusinessEmployeesEntity } from '@/modules/v1/business-employees';
import type { BusinessesEntity } from '../business.entity';
import type { BusinessRolePermissionsEntity } from './business-role-permission.entity';

export interface BusinessRolesEntity {
  businessRoleId: string;
  businessRoleBusinessId: string;
  businessRoleBusiness: BusinessesEntity;
  businessRoleEmployees: BusinessEmployeesEntity[];
  businessRolePermissions: BusinessRolePermissionsEntity[];
  businessRoleKey: string;
  businessRoleNameFa: string;
  businessRoleNameEn: string;
  businessRoleDescriptionFa: string | null;
  businessRoleDescriptionEn: string | null;
  businessRoleIsActive: boolean;
  businessRoleCreatedAt: Date;
  businessRoleUpdatedAt: Date;
  businessRoleDeletedAt: Date | null;
}
