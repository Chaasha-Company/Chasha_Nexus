import type { findPlatformAdminPermissionsByIdsQuery } from '@/modules/v1/authorizations/application';
import type { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import type { EntityManager } from 'typeorm';

export type FindPlatformAdminPermissionsByIdsRepositoryContract = (platformAdminPermissionsData: findPlatformAdminPermissionsByIdsQuery, manager?: EntityManager) => Promise<PermissionsModel[]>;
