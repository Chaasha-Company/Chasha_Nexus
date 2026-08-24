import type { findPlatformAdminPermissionByIdQuery } from '@/modules/v1/authorizations/application';
import type { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import type { EntityManager } from 'typeorm';

export type FindPlatformAdminPermissionByIdRepositoryContract = (platformAdminPermissionData: findPlatformAdminPermissionByIdQuery, manager?: EntityManager) => Promise<PermissionsModel | null>;
