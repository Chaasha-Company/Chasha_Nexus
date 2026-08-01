import type { BusinessEmployeesEntity } from '@/modules/v1/business-employees';

export interface BusinessesEntity {
  businessId: string;
  businessName: string;
  businessSlug: string;
  businessEmployees: BusinessEmployeesEntity;
  businessCreatedAt: Date;
  businessUpdatedAt: Date;
  businessDeletedAt: Date;
}
