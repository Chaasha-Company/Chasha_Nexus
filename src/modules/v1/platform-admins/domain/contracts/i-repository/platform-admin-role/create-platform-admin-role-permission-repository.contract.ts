import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

export type CreatePlatformAdminRolePermissionRepositoryContract = (createPlatformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, manager?: EntityManager) => Promise<{ platformAdminRolePermissionId: string }>;
