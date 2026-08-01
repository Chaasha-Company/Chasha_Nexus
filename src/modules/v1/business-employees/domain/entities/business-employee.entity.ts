import type { BusinessEmployeeSessionsEntity } from '@/modules/v1/business-employee-sessions';
import type { BusinessEmployeeStatusesEntity } from './business-employee-status.entity';
import type { BusinessesEntity } from '@/modules/v1/business/domain';

export interface BusinessEmployeesEntity {
  businessEmployeeId: string;
  businessEmployeeStatusId: string;
  businessEmployeeStatus: BusinessEmployeeStatusesEntity;
  businessEmployeeSessions: BusinessEmployeeSessionsEntity[];
  businessEmployeeBusinessId: string;
  businessEmployeeBusiness: BusinessesEntity;
  businessEmployeeCode: string;
  businessEmployeePassword: string;
  businessEmployeeResetPasswordCode: string;
  businessEmployeeFirstName: string;
  businessEmployeeLastName: string;
  businessEmployeeNationalCode: string;
  businessEmployeePhoneNumber: string;
  businessEmployeeBirthDate: Date | null;
  businessEmployeeCreatedAt: Date;
  businessEmployeeUpdatedAt: Date;
  businessEmployeeDeletedAt: Date | null;
}
