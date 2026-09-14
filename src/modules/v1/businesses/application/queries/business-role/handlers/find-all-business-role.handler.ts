import type { FindAllBusinessRoleResultQuery } from '../results';
import type { FindAllBusinessRoleQuery } from '../find-all-business-role.query';
import { findAllBusinessRoleRepository } from '@/modules/v1/businesses/infrastructure';

export const findAllBusinessRoleQueryHandler = async (businessRoleData: FindAllBusinessRoleQuery): Promise<FindAllBusinessRoleResultQuery> => {
  const result = await findAllBusinessRoleRepository()({
    businessRoleBusinessId: businessRoleData.businessRoleBusinessId,
    businessRoleSearchQuery: businessRoleData.businessRoleSearchQuery,
    businessRoleIsActiveQuery: businessRoleData.businessRoleIsActiveQuery,
    businessRolePaginationSkip: businessRoleData.businessRolePaginationSkip,
    businessRolePaginationTake: businessRoleData.businessRolePaginationTake,
  });

  return {
    count: result.count,
    data: result.data.map((item) => ({
      businessRoleId: item.businessRoleId,

      businessRoleKey: item.businessRoleKey,

      businessRoleNameFa: item.businessRoleNameFa,

      businessRoleNameEn: item.businessRoleNameEn,

      businessRoleDescriptionFa: item.businessRoleDescriptionFa,

      businessRoleDescriptionEn: item.businessRoleDescriptionEn,

      businessRoleIsActive: item.businessRoleIsActive,

      businessRoleCreatedAt: item.businessRoleCreatedAt,

      businessRoleUpdatedAt: item.businessRoleUpdatedAt,
    })),
  };
};
