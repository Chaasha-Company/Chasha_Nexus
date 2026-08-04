import type { CreatePlatformAdminSessionCommand } from '@/modules/v1/platform-admin-sessions/application';
import type { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

export type CreatePlatformAdminSessionRepositoryContract = (createPlatformAdminSessionData: CreatePlatformAdminSessionCommand) => Promise<PlatformAdminSessionsModel>;
