import type { FindPlatformAdminSessionByIdQuery } from '@/modules/v1/platform-admin-sessions/application';
import type { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export type FindPlatformAdminSessionByIdRepositoryContract = (PlatformAdminSessionData: FindPlatformAdminSessionByIdQuery) => Promise<PlatformAdminSessionsModel | null>;
