import type { FindBusinessEmployeeSessionByIdQuery } from '@/modules/v1/business-employee-sessions/application';
import type { FindBusinessEmployeeSessionByIdRepositoryContract } from '@/modules/v1/business-employee-sessions/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/children';
import { AppDataSource } from '@/shared/v1/database/core';

export const findBusinessEmployeeSessionByIdRepository =
  (): FindBusinessEmployeeSessionByIdRepositoryContract =>
  async (businessEmployeeSessionData: FindBusinessEmployeeSessionByIdQuery, ctx?: TransactionContext): Promise<BusinessEmployeeSessionsModel | null> => {
    const businessEmployeeSessionRepository = ctx ? ctx.getRepository(BusinessEmployeeSessionsModel) : AppDataSource.getRepository(BusinessEmployeeSessionsModel);

    return await businessEmployeeSessionRepository.findOne({
      where: {
        businessEmployeeSessionId: businessEmployeeSessionData.businessEmployeeSessionId,
      },
      cache: true,
    });
  };
