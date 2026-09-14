import type { UpdateBusinessRoleCommand } from '@/modules/v1/businesses/application';
import type { UpdateBusinessRoleRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children';

export const updateBusinessRoleRepository =
  (): UpdateBusinessRoleRepositoryContract =>
  async (updateBusinessRoleData: UpdateBusinessRoleCommand, ctx?: TransactionContext): Promise<void> => {
    const businessRoleRepository = ctx ? ctx.getRepository(BusinessRolesModel) : AppDataSource.getRepository(BusinessRolesModel);

    const { businessRoleId, businessRoleBusinessId, ...updateData } = updateBusinessRoleData;

    await businessRoleRepository.update(
      {
        businessRoleId,
        businessRoleBusinessId,
      },
      updateData,
    );
  };
