import type { FindBusinessEmployeeSessionByIdQuery } from '@/modules/v1/business-employee-sessions/application';
import type { FindBusinessEmployeeSessionByIdRepositoryContract } from '@/modules/v1/business-employee-sessions/domain';
import { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/childrens';
import { AppDataSource } from '@/shared/v1/database/core';

export const findBusinessEmployeeSessionByIdRepository =
  (): FindBusinessEmployeeSessionByIdRepositoryContract =>
  async (businessEmployeeSessionData: FindBusinessEmployeeSessionByIdQuery): Promise<BusinessEmployeeSessionsModel | null> => {
    const businessEmployeeSessionRepository = AppDataSource.getRepository(BusinessEmployeeSessionsModel);

    return await businessEmployeeSessionRepository.findOneBy({ businessEmployeeSessionId: businessEmployeeSessionData.businessEmployeeSessionId });
  };
