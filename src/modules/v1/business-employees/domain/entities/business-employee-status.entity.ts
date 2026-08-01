import type { BusinessEmployeesEntity } from './business-employee.entity';

export interface BusinessEmployeeStatusesEntity {
  businessEmployeeStatusId: string;
  businessEmployeeStatusName: string;
  businessEmployeeStatusSlug: string;
  businessEmployeeStatusDescription: string | null;
  businessEmployeeStatusSortOrder: number;
  businessEmployeeStatusIsSystem: boolean;
  businessEmployees: BusinessEmployeesEntity[];
  businessEmployeeStatusCreatedAt: Date;
  businessEmployeeStatusUpdatedAt: Date;
  businessEmployeeStatusDeletedAt: Date | null;
}
