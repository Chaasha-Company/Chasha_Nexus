import type { BusinessEmployeesEntity } from '@/modules/v1/business-employees';
import type { BusinessTypesEntity } from './business-type.entity';
import type { BusinessRolesEntity } from './business-role/business-role.entity';

export interface BusinessesEntity {
  businessId: string;
  businessName: string;
  businessSlug: string;
  businessRoles: BusinessRolesEntity[];
  businessEmployees: BusinessEmployeesEntity;
  businessType: BusinessTypesEntity;
  businessCreatedAt: Date;
  businessUpdatedAt: Date;
  businessDeletedAt: Date | null;
}
