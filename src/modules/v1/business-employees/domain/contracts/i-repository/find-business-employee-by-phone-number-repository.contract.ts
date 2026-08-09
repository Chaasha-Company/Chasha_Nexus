import type { FindBusinessEmployeeByPhoneNumberQuery } from '@/modules/v1/business-employees/application';
import type { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';
import type { EntityManager } from 'typeorm';

export type FindBusinessEmployeeByPhoneNumberRepositoryContract = (businessEmployeeData: FindBusinessEmployeeByPhoneNumberQuery, manager?: EntityManager) => Promise<null | BusinessEmployeesModel>;
