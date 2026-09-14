import type { UpdateBusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';
import type { UpdateBusinessEmployeeSessionRepositoryContract } from '@/modules/v1/business-employee-sessions/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/children';
import { AppDataSource } from '@/shared/v1/database/core';

export const updateBusinessEmployeeSessionRepository =
  (): UpdateBusinessEmployeeSessionRepositoryContract =>
  async (businessEmployeeSessionData: UpdateBusinessEmployeeSessionCommand, ctx?: TransactionContext): Promise<void> => {
    const businessEmployeeSessionRepository = ctx ? ctx.getRepository(BusinessEmployeeSessionsModel) : AppDataSource.getRepository(BusinessEmployeeSessionsModel);

    const { businessEmployeeSessionId, ...updateData } = businessEmployeeSessionData;

    await businessEmployeeSessionRepository.update(
      {
        businessEmployeeSessionId,
      },
      {
        ...updateData,
      },
    );
  };
