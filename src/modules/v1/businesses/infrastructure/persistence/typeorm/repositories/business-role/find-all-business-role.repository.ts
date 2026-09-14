import type { FindAllBusinessRoleQuery } from '@/modules/v1/businesses/application';
import type { FindAllBusinessRoleRepositoryContract } from '@/modules/v1/businesses/domain';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';

import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children';

export const findAllBusinessRoleRepository =
  (): FindAllBusinessRoleRepositoryContract =>
  async (businessRoleData: FindAllBusinessRoleQuery, ctx?: TransactionContext): Promise<PaginationResponseRepository<BusinessRolesModel>> => {
    const repository = ctx ? ctx.getRepository(BusinessRolesModel) : AppDataSource.getRepository(BusinessRolesModel);

    const queryBuilder = repository.createQueryBuilder('businessRole');

    queryBuilder.andWhere('businessRole.businessRoleBusinessId = :businessId', {
      businessId: businessRoleData.businessRoleBusinessId,
    });

    if (businessRoleData.businessRoleSearchQuery !== undefined && businessRoleData.businessRoleSearchQuery !== '') {
      queryBuilder.andWhere('(businessRole.businessRoleKey LIKE :search OR businessRole.businessRoleNameFa LIKE :search OR businessRole.businessRoleNameEn LIKE :search)', {
        search: `%${businessRoleData.businessRoleSearchQuery}%`,
      });
    }

    if (businessRoleData.businessRoleIsActiveQuery !== undefined) {
      queryBuilder.andWhere('businessRole.businessRoleIsActive = :isActive', {
        isActive: businessRoleData.businessRoleIsActiveQuery,
      });
    }

    const cacheKey = [
      'business-roles',
      businessRoleData.businessRoleBusinessId,
      businessRoleData.businessRoleSearchQuery ?? '',
      businessRoleData.businessRoleIsActiveQuery ?? '',
      businessRoleData.businessRolePaginationSkip,
      businessRoleData.businessRolePaginationTake,
    ].join(':');

    queryBuilder.skip(businessRoleData.businessRolePaginationSkip).take(businessRoleData.businessRolePaginationTake).orderBy('businessRole.businessRoleCreatedAt', 'DESC').cache(cacheKey, 30_000);

    const [data, count] = await queryBuilder.getManyAndCount();

    return {
      data,
      count,
    };
  };
