import type { RevokedAllBusinessEmployeeSessionByIdCommand } from '@/modules/v1/business-employee-sessions/application';
import type { RevokedAllBusinessEmployeeSessionByIdRepositoryContract } from '@/modules/v1/business-employee-sessions/domain';
import { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/childrens';
import { AppDataSource } from '@/shared/v1/database/core';
import { IsNull } from 'typeorm';

export const revokedAllBusinessEmployeeSessionByIdRepository =
  (): RevokedAllBusinessEmployeeSessionByIdRepositoryContract =>
  async (businessEmployeeSessionData: RevokedAllBusinessEmployeeSessionByIdCommand): Promise<void> => {
    const businessEmployeeSessionRepository = AppDataSource.getRepository(BusinessEmployeeSessionsModel);

    await businessEmployeeSessionRepository.update(
      {
        businessEmployeeSessionUserId: businessEmployeeSessionData.businessEmployeeSessionUserId,
        businessEmployeeSessionRevokedAt: IsNull(),
      },
      {
        businessEmployeeSessionRevokedAt: new Date(),
        businessEmployeeSessionIsActive: false,
      },
    );
  };
