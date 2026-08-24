import type { DeletePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

export type DeletePlatformAdminRolePermissionsRepositoryContract = (deletePlatformAdminRolePermissionsData: DeletePlatformAdminRoleCommand, manager?: EntityManager) => Promise<void>;
