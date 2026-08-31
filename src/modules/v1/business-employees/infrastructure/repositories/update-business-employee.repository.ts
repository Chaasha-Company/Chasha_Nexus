import type { UpdateBusinessEmployeeRepositoryContract } from '@/modules/v1/business-employees/domain';
import type { UpdateBusinessEmployeeCommand } from '@/modules/v1/business-employees/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';
import { AppDataSource } from '@/shared/v1/database/core';

export const updateBusinessEmployeeRepository =
  (): UpdateBusinessEmployeeRepositoryContract =>
  async (businessEmployeeData: UpdateBusinessEmployeeCommand, ctx?: TransactionContext): Promise<void> => {
    const businessEmployeeRepository = ctx ? ctx.getRepository(BusinessEmployeesModel) : AppDataSource.getRepository(BusinessEmployeesModel);

    const { businessEmployeeId, ...updateData } = businessEmployeeData;

    await businessEmployeeRepository.update(
      {
        businessEmployeeId,
      },
      {
        ...updateData,
      },
    );
  };
