import type { FindBusinessEmployeeByPhoneNumberRepositoryContract } from '@/modules/v1/business-employees/domain';
import type { FindBusinessEmployeeByPhoneNumberQuery } from '@/modules/v1/business-employees/application';
import type { EntityManager } from 'typeorm';
import { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';
import { AppDataSource } from '@/shared/v1/database/core';

export const findBusinessEmployeeByPhoneNumberRepository =
  (): FindBusinessEmployeeByPhoneNumberRepositoryContract =>
  async (businessEmployeeData: FindBusinessEmployeeByPhoneNumberQuery, manager?: EntityManager): Promise<null | BusinessEmployeesModel> => {
    const businessEmployeeRepository = manager ? manager.getRepository(BusinessEmployeesModel) : AppDataSource.getRepository(BusinessEmployeesModel);

    return await businessEmployeeRepository.findOne({
      where: {
        businessEmployeePhoneNumber: businessEmployeeData.businessEmployeePhoneNumber,
      },
    });
  };
