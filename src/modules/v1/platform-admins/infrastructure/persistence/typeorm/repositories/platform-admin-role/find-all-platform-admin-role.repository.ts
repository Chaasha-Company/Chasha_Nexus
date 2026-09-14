import type { FindAllPlatformAdminRoleQuery } from '@/modules/v1/platform-admins/application';
import type { FindAllPlatformAdminRoleRepositoryContract } from '@/modules/v1/platform-admins/domain';

import type { TransactionContext } from '@/shared/v1/domain/contracts';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';

import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/children';

import { applyPlatformAdminRoleSearch } from '@/modules/v1/platform-admins/infrastructure/persistence/typeorm/list';

export const findAllPlatformAdminRoleRepository =
  (): FindAllPlatformAdminRoleRepositoryContract =>
  async (platformAdminRoleData: FindAllPlatformAdminRoleQuery, ctx?: TransactionContext): Promise<PaginationResponseRepository<PlatformAdminRolesModel>> => {
    const repository = ctx ? ctx.getRepository(PlatformAdminRolesModel) : AppDataSource.getRepository(PlatformAdminRolesModel);

    const queryBuilder = repository.createQueryBuilder('platformAdminRole');

    applyPlatformAdminRoleSearch(queryBuilder, platformAdminRoleData.platformAdminRoleSearchQuery);

    if (platformAdminRoleData.platformAdminRoleIsActiveQuery !== undefined) {
      queryBuilder.andWhere('platformAdminRole.platformAdminRoleIsActive = :isActive', {
        isActive: platformAdminRoleData.platformAdminRoleIsActiveQuery,
      });
    }

    const cacheKey = [
      'platform-admin-roles',
      platformAdminRoleData.platformAdminRoleSearchQuery ?? '',
      platformAdminRoleData.platformAdminRoleIsActiveQuery ?? '',
      platformAdminRoleData.platformAdminRolePaginationSkip,
      platformAdminRoleData.platformAdminRolePaginationTake,
    ].join(':');

    queryBuilder.skip(platformAdminRoleData.platformAdminRolePaginationSkip).take(platformAdminRoleData.platformAdminRolePaginationTake).orderBy('platformAdminRole.platformAdminRoleCreatedAt', 'DESC').cache(cacheKey, 30_000);

    const [data, count] = await queryBuilder.getManyAndCount();

    return {
      data,
      count,
    };
  };
