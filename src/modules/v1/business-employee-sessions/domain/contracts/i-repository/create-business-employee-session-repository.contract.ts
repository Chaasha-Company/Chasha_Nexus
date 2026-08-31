import type { CreatebusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';
import type { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/childrens';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type CreateBusinessEmployeeSessionRepositoryContract = (datacreatePlatformAdminSessionData: CreatebusinessEmployeeSessionCommand, ctx?: TransactionContext) => Promise<BusinessEmployeeSessionsModel>;
