import type { CountBusinessRoleEmployeesQuery } from '@/modules/v1/businesses/application';
import type { CountBusinessRoleEmployeesRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';

export const countBusinessRoleEmployeesRepository =
  (): CountBusinessRoleEmployeesRepositoryContract =>
  async (businessRoleData: CountBusinessRoleEmployeesQuery, ctx?: TransactionContext): Promise<number> => {
    const businessEmployeeRepository = ctx ? ctx.getRepository(BusinessEmployeesModel) : AppDataSource.getRepository(BusinessEmployeesModel);

    return businessEmployeeRepository.count({
      where: {
        businessEmployeeRoleId: businessRoleData.businessRoleId,
        businessEmployeeBusinessId: businessRoleData.businessRoleBusinessId,
      },
    });
  };
