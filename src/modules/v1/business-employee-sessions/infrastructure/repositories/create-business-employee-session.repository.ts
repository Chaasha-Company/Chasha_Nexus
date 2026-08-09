import type { CreatebusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';
import type { CreateBusinessEmployeeSessionRepositoryContract } from '@/modules/v1/business-employee-sessions/domain';
import type { EntityManager } from 'typeorm';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/';

export const createBusinessEmployeeSessionRepository =
  (): CreateBusinessEmployeeSessionRepositoryContract =>
  async (createBusinessEmployeeSessionData: CreatebusinessEmployeeSessionCommand, manager?: EntityManager): Promise<BusinessEmployeeSessionsModel> => {
    const businessEmployeeSessionRepository = manager ? manager.getRepository(BusinessEmployeeSessionsModel) : AppDataSource.getRepository(BusinessEmployeeSessionsModel);

    const businessEmployeeSessionData = businessEmployeeSessionRepository.create(createBusinessEmployeeSessionData);

    return businessEmployeeSessionRepository.save(businessEmployeeSessionData);
  };
