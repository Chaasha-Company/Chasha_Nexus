import type { CreatePlatformAdminSessionCommand } from '@/modules/v1/platform-admin-sessions/application';
import type { PlatformAdminSessionsEntity } from '@/modules/v1/platform-admin-sessions/domain/entities';

export type CreatePlatformAdminSessionRepositoryContract = (createPlatformAdminSessionData: CreatePlatformAdminSessionCommand) => Promise<PlatformAdminSessionsEntity>;
