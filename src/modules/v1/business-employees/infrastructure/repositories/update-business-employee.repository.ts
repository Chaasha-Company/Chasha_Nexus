import type { UpdateBusinessEmployeeRepositoryContract } from '@/modules/v1/business-employees/domain';
import type { UpdateBusinessEmployeeCommand } from '@/modules/v1/business-employees/application';
import type { EntityManager } from 'typeorm';
import { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';
import { AppDataSource } from '@/shared/v1/database/core';

export const updateBusinessEmployeeRepository =
  (): UpdateBusinessEmployeeRepositoryContract =>
  async (businessEmployeeData: UpdateBusinessEmployeeCommand, manager?: EntityManager): Promise<void> => {
    const businessEmployeeRepository = manager ? manager.getRepository(BusinessEmployeesModel) : AppDataSource.getRepository(BusinessEmployeesModel);

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
