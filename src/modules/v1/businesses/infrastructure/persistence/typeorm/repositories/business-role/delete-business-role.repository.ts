import type { DeleteBusinessRoleCommand } from '@/modules/v1/businesses/application';
import type { DeleteBusinessRoleRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children';

export const deleteBusinessRoleRepository =
  (): DeleteBusinessRoleRepositoryContract =>
  async (deleteBusinessRoleData: DeleteBusinessRoleCommand, ctx?: TransactionContext): Promise<void> => {
    const businessRoleRepository = ctx ? ctx.getRepository(BusinessRolesModel) : AppDataSource.getRepository(BusinessRolesModel);

    await businessRoleRepository.softDelete({
      businessRoleId: deleteBusinessRoleData.businessRoleId,
      businessRoleBusinessId: deleteBusinessRoleData.businessRoleBusinessId,
    });
  };
