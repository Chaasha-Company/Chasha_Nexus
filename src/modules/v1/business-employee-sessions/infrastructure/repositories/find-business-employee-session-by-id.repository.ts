import type { FindBusinessEmployeeSessionByIdQuery } from '@/modules/v1/business-employee-sessions/application';
import type { FindBusinessEmployeeSessionByIdRepositoryContract } from '@/modules/v1/business-employee-sessions/domain';
import type { EntityManager } from 'typeorm';
import { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const findBusinessEmployeeSessionByIdRepository =
  (): FindBusinessEmployeeSessionByIdRepositoryContract =>
  async (businessEmployeeSessionData: FindBusinessEmployeeSessionByIdQuery, manager?: EntityManager): Promise<BusinessEmployeeSessionsModel | null> => {
    const businessEmployeeSessionRepository = manager ? manager.getRepository(BusinessEmployeeSessionsModel) : AppDataSource.getRepository(BusinessEmployeeSessionsModel);

    return await businessEmployeeSessionRepository.findOne({
      where: {
        businessEmployeeSessionId: businessEmployeeSessionData.businessEmployeeSessionId,
      },
      cache: true,
    });
  };
