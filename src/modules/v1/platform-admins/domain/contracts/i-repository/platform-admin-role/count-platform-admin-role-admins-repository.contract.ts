import type { findPlatformAdminRoleByIdQuery } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

export type CountPlatformAdminRoleAdminsRepositoryContract = (platformAdminRoleData: findPlatformAdminRoleByIdQuery, manager?: EntityManager) => Promise<number>;
