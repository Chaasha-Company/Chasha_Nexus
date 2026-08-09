import type { CreatebusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';
import type { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/childrens';
import type { EntityManager } from 'typeorm';

export type CreateBusinessEmployeeSessionRepositoryContract = (datacreatePlatformAdminSessionData: CreatebusinessEmployeeSessionCommand, manager?: EntityManager) => Promise<BusinessEmployeeSessionsModel>;
