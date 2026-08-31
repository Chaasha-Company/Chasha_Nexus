import type { findPlatformAdminPermissionByIdQuery } from '@/modules/v1/authorizations/application';
import type { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindPlatformAdminPermissionByIdRepositoryContract = (platformAdminPermissionData: findPlatformAdminPermissionByIdQuery, ctx?: TransactionContext) => Promise<PermissionsModel | null>;
