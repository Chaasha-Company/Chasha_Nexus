import type { BusinessEmployeesEntity } from '@/modules/v1/business-employees';
import type { BusinessTypesEntity } from './business-type.entity';

export interface BusinessesEntity {
  businessId: string;
  businessName: string;
  businessSlug: string;
  businessEmployees: BusinessEmployeesEntity;
  businessType: BusinessTypesEntity;
  businessCreatedAt: Date;
  businessUpdatedAt: Date;
  businessDeletedAt: Date;
}
