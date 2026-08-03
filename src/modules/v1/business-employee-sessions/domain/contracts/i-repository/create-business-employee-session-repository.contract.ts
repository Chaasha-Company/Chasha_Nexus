import type { CreatebusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';
import type { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/childrens';

export type CreateBusinessEmployeeSessionRepositoryContract = (createPlatformAdminSessionData: CreatebusinessEmployeeSessionCommand) => Promise<BusinessEmployeeSessionsModel>;
