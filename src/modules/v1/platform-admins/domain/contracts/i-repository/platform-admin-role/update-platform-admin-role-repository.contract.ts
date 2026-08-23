import type { UpdatePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

export type UpdatePlatformAdminRoleRepositoryContract = (updatePlatformAdminRoleData: UpdatePlatformAdminRoleCommand, manager?: EntityManager) => Promise<void>;
