import type { FindBusinessEmployeeByPhoneNumberRepositoryContract } from '@/modules/v1/business-employees/domain';
import type { FindBusinessEmployeeByPhoneNumberQuery } from '@/modules/v1/business-employees/application';
import { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';
import { AppDataSource } from '@/shared/v1/database/core';

export const findBusinessEmployeeByPhoneNumberRepository =
  (): FindBusinessEmployeeByPhoneNumberRepositoryContract =>
  async (businessEmployeeData: FindBusinessEmployeeByPhoneNumberQuery): Promise<null | BusinessEmployeesModel> => {
    const businessEmployeeRepository = AppDataSource.getRepository(BusinessEmployeesModel);

    return await businessEmployeeRepository.findOne({
      where: {
        businessEmployeePhoneNumber: businessEmployeeData.businessEmployeePhoneNumber,
      },
    });
  };
