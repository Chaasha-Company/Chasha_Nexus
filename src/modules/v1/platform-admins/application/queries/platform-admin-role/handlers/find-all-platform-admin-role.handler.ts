import type { FindAllPlatformAdminRoleResultQuery } from '../results';
import type { GetAllPlatformAdminRoleRequestQueryDTO } from '@/modules/v1/authorizations/presentation';
import { findAllPlatformAdminRoleRepository } from '@/modules/v1/platform-admins/infrastructure';

export const findAllPlatformAdminRoleQueryHandler = async (platformAdminRoleData: GetAllPlatformAdminRoleRequestQueryDTO): Promise<FindAllPlatformAdminRoleResultQuery> => {
  const paginationPage = Number(platformAdminRoleData.paginationPage);
  const paginationLimit = Number(platformAdminRoleData.paginationLimit);
  const paginationSkip = (paginationPage - 1) * paginationLimit;

  const result = await findAllPlatformAdminRoleRepository()({
    platformAdminRoleSearchQuery: platformAdminRoleData.platformAdminRoleSearch as string,
    platformAdminRoleIsActiveQuery: platformAdminRoleData.platformAdminRoleIsActive === undefined ? undefined : platformAdminRoleData.platformAdminRoleIsActive === 'true',
    platformAdminRolePaginationSkip: paginationSkip,
    platformAdminRolePaginationTake: paginationLimit,
  });

  return {
    count: result.count,
    data: result.data.map((item) => ({
      platformAdminRoleId: item.platformAdminRoleId,

      platformAdminRoleKey: item.platformAdminRoleKey,

      platformAdminRoleNameFa: item.platformAdminRoleNameFa,

      platformAdminRoleNameEn: item.platformAdminRoleNameEn,

      platformAdminRoleDescriptionFa: item.platformAdminRoleDescriptionFa,

      platformAdminRoleDescriptionEn: item.platformAdminRoleDescriptionEn,

      platformAdminRoleIsActive: item.platformAdminRoleIsActive,

      platformAdminRoleCreatedAt: item.platformAdminRoleCreatedAt,
    })),
  };
};
