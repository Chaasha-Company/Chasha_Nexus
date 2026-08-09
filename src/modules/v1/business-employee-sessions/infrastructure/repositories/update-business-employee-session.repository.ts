import type { UpdateBusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';
import type { UpdateBusinessEmployeeSessionRepositoryContract } from '@/modules/v1/business-employee-sessions/domain';
import type { EntityManager } from 'typeorm';
import { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const updateBusinessEmployeeSessionRepository =
  (): UpdateBusinessEmployeeSessionRepositoryContract =>
  async (businessEmployeeSessionData: UpdateBusinessEmployeeSessionCommand, manager?: EntityManager): Promise<void> => {
    const businessEmployeeSessionRepository = manager ? manager.getRepository(BusinessEmployeeSessionsModel) : AppDataSource.getRepository(BusinessEmployeeSessionsModel);

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
