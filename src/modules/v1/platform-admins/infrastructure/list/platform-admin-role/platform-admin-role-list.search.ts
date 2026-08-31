import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens/platform-admin-roles';
import type { SelectQueryBuilder } from 'typeorm';

export const applyPlatformAdminRoleSearch = (queryBuilder: SelectQueryBuilder<PlatformAdminRolesModel>, search?: string) => {
  if (!search) {
    return queryBuilder;
  }

  return queryBuilder.andWhere(
    `(
      platformAdminRole.platformAdminRoleKey LIKE :search
      OR platformAdminRole.platformAdminRoleNameFa LIKE :search
      OR platformAdminRole.platformAdminRoleNameEn LIKE :search
    )`,
    {
      search: `%${search}%`,
    },
  );
};
