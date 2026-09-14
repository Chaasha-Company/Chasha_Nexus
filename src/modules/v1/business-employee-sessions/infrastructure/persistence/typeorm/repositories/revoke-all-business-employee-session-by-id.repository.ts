import type { revokeAllBusinessEmployeeSessionByIdCommand } from '@/modules/v1/business-employee-sessions/application';
import type { RevokeAllBusinessEmployeeSessionByIdRepositoryContract } from '@/modules/v1/business-employee-sessions/domain';
import { BusinessEmployeeSessionsModel } from '@/shared/v1/database/schema/business_employees/children';
import { AppDataSource } from '@/shared/v1/database/core';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { IsNull } from 'typeorm';

export const RevokeAllBusinessEmployeeSessionByIdRepository =
  (): RevokeAllBusinessEmployeeSessionByIdRepositoryContract =>
  async (businessEmployeeSessionData: revokeAllBusinessEmployeeSessionByIdCommand, ctx?: TransactionContext): Promise<void> => {
    const businessEmployeeSessionRepository = ctx ? ctx.getRepository(BusinessEmployeeSessionsModel) : AppDataSource.getRepository(BusinessEmployeeSessionsModel);

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
