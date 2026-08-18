import type { FindAllBusinessPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { EntityManager } from 'typeorm';
import type { FindAllBusinessPermissionByRoleIdRepositoryContract } from '@/modules/v1/authorizations/domain';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/childrens';

export const findAllBusinessPermissionByRoleIdRepository =
  (): FindAllBusinessPermissionByRoleIdRepositoryContract =>
  async (businessPermissionData: FindAllBusinessPermissionByRoleIdQuery, manager?: EntityManager): Promise<BusinessRolePermissionsModel[]> => {
    const businessPermissionRoleRepository = manager ? manager.getRepository(BusinessRolePermissionsModel) : AppDataSource.getRepository(BusinessRolePermissionsModel);

    return businessPermissionRoleRepository.find({
      where: {
        businessRolePermissionId: businessPermissionData.businessPermissionRoleId,
      },
      relations: {
        businessRolePermissionPermission: true,
      },
    });
  };
