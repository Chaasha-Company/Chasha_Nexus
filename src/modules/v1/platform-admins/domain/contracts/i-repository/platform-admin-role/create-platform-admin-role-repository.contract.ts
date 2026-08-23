import type { CreatePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';

export type CreatePlatformAdminRoleRepositoryContract = (createPlatformAdminRoleData: CreatePlatformAdminRoleCommand, manager?: EntityManager) => Promise<{ platformAdminRoleId: string }>;
