import type { PlatformAdminSessionsEntity } from '@/modules/v1/platform-admin-sessions/domain/entities';
import type { CreatePlatformAdminSessionRequestDTO } from '@/modules/v1/platform-admin-sessions/presentation';

export type CreatePlatformAdminSessionRepositoryContract = (createPlatformAdminSessionData: CreatePlatformAdminSessionRequestDTO) => Promise<PlatformAdminSessionsEntity>;
