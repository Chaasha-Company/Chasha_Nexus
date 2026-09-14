import type { CreateBusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';
import type { CreateBusinessEmployeeSessionRepositoryContract } from '@/modules/v1/business-employee-sessions/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/';

export const createBusinessEmployeeSessionRepository =
  (): CreateBusinessEmployeeSessionRepositoryContract =>
  async (createBusinessEmployeeSessionData: CreateBusinessEmployeeSessionCommand, ctx?: TransactionContext): Promise<BusinessEmployeeSessionsModel> => {
    const businessEmployeeSessionRepository = ctx ? ctx.getRepository(BusinessEmployeeSessionsModel) : AppDataSource.getRepository(BusinessEmployeeSessionsModel);

    const businessEmployeeSessionData = businessEmployeeSessionRepository.create(createBusinessEmployeeSessionData);

    return businessEmployeeSessionRepository.save(businessEmployeeSessionData);
  };
