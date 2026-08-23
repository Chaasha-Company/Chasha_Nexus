import type { FindPlatformAdminRoleByKeyQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import type { EntityManager } from 'typeorm';

export type FindPlatformAdminRoleByKeyRepositoryContract = (platformAdminRoleData: FindPlatformAdminRoleByKeyQuery, manager?: EntityManager) => Promise<PlatformAdminRolesModel | null>;
