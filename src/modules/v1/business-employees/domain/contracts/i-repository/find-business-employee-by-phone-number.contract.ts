import type { FindBusinessEmployeeByPhoneNumberRequestDTO } from '@/modules/v1/business-employees/presentation';
import type { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';

export type FindBusinessEmployeeByPhoneNumberRepositoryContract = (platformAdminData: FindBusinessEmployeeByPhoneNumberRequestDTO) => Promise<null | BusinessEmployeesModel>;
