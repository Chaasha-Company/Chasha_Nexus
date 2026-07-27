import type { PlatformAdminSessionsEntity } from '@/modules/v1/platform-admins/domain/entities';
import type { CreatePlatformAdminSessionRequestDTO } from '@/modules/v1/platform-admins/presentation';

export type CreatePlatformAdminSessionRepositoryContract = (createPlatformAdminSessionData: CreatePlatformAdminSessionRequestDTO) => Promise<PlatformAdminSessionsEntity>;
