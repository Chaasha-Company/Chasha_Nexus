import type { FindBusinessEmployeeByPhoneNumberQuery } from '@/modules/v1/business-employees/application';
import type { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindBusinessEmployeeByPhoneNumberRepositoryContract = (businessEmployeeData: FindBusinessEmployeeByPhoneNumberQuery, ctx?: TransactionContext) => Promise<null | BusinessEmployeesModel>;
