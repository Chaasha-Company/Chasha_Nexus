import type { BusinessEmployeesEntity } from './business-employee.entity';

export interface BusinessEmployeeStatusesEntity {
  businessEmployeeStatusId: number;
  businessEmployeeStatusNameEn: string;
  businessEmployeeStatusNameFa: string;
  businessEmployeeStatusSlug: string;
  businessEmployeeStatusDescriptionEn: string | null;
  businessEmployeeStatusDescriptionFa: string | null;
  businessEmployeeStatusSortOrder: number;
  businessEmployeeStatusIsSystem: boolean;
  businessEmployees: BusinessEmployeesEntity[];
  businessEmployeeStatusCreatedAt: Date;
  businessEmployeeStatusUpdatedAt: Date;
  businessEmployeeStatusDeletedAt: Date | null;
}
