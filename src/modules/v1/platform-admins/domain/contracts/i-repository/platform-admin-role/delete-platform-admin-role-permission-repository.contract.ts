import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

export type DeletePlatformAdminRolePermissionRepositoryContract = (deletePlatformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, manager?: EntityManager) => Promise<void>;
