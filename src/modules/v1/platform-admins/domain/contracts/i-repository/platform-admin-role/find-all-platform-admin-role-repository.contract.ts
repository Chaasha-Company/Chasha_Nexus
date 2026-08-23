import type { FindAllPlatformAdminRoleQuery } from '@/modules/v1/platform-admins/application';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';
import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export type FindAllPlatformAdminRoleRepositoryContract = (platformAdminRoleData: FindAllPlatformAdminRoleQuery) => Promise<PaginationResponseRepository<PlatformAdminRolesModel>>;
