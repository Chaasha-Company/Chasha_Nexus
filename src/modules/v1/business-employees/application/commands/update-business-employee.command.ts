import type { AtLeastOne } from '@/shared/v1/types/other';

export type UpdateBusinessEmployeeCommand = AtLeastOne<{
  businessEmployeeId: string;
  businessEmployeeStatusId?: number;
  businessEmployeeBusinessId?: string;
  businessEmployeeRoleId?: string;
  businessEmployeeCode?: string;
  businessEmployeePassword?: string;
  businessEmployeeResetPasswordCode?: string;
  businessEmployeeFirstName?: string;
  businessEmployeeLastName?: string;
  businessEmployeeNationalCode?: string;
  businessEmployeePhoneNumber?: string;
  businessEmployeeBirthDate?: Date;
}>;
