import type { BusinessEmployeeSessionsEntity } from '@/modules/v1/business-employee-sessions';
import type { BusinessEmployeeStatusesEntity } from './business-employee-status.entity';
import type { BusinessesEntity, BusinessRolesEntity } from '@/modules/v1/businesses/domain';

export interface BusinessEmployeesEntity {
  businessEmployeeId: string;
  businessEmployeeStatusId: number;
  businessEmployeeStatus: BusinessEmployeeStatusesEntity;
  businessEmployeeSessions: BusinessEmployeeSessionsEntity[];
  businessEmployeeRoleId: string;
  businessEmployeeRole: BusinessRolesEntity;
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
