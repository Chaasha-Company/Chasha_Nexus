import type { findPlatformAdminRoleByIdQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens/platform-admin-roles';
import type { EntityManager } from 'typeorm';

export type FindPlatformAdminRoleByIdRepositoryContract = (platformAdminRoleData: findPlatformAdminRoleByIdQuery, manager?: EntityManager) => Promise<PlatformAdminRolesModel | null>;
