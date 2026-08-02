import type { CreatebusinessEmployeeSessionRequestDTO } from '@/modules/v1/business-employee-sessions/presentation';
import type { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/childrens';

export type CreateBusinessEmployeeSessionRepositoryContract = (createPlatformAdminSessionData: CreatebusinessEmployeeSessionRequestDTO) => Promise<BusinessEmployeeSessionsModel>;
