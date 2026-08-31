import type { FindAllBusinessPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import type { FindAllBusinessPermissionByRoleIdRepositoryContract } from '@/modules/v1/authorizations/domain';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/childrens';

export const findAllBusinessPermissionByRoleIdRepository =
  (): FindAllBusinessPermissionByRoleIdRepositoryContract =>
  async (businessPermissionData: FindAllBusinessPermissionByRoleIdQuery, ctx?: TransactionContext): Promise<BusinessRolePermissionsModel[]> => {
    const businessPermissionRoleRepository = ctx ? ctx.getRepository(BusinessRolePermissionsModel) : AppDataSource.getRepository(BusinessRolePermissionsModel);

    return businessPermissionRoleRepository.find({
      where: {
        businessRolePermissionId: businessPermissionData.businessPermissionRoleId,
      },
      relations: {
        businessRolePermissionPermission: true,
      },
    });
  };
