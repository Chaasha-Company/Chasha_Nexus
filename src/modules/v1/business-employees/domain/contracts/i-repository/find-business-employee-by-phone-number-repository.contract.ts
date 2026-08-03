import type { FindBusinessEmployeeByPhoneNumberQuery } from '@/modules/v1/business-employees/application';
import type { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';

export type FindBusinessEmployeeByPhoneNumberRepositoryContract = (businessEmployeeData: FindBusinessEmployeeByPhoneNumberQuery) => Promise<null | BusinessEmployeesModel>;
