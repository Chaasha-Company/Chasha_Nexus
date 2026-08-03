import type { UpdatePlatformAdminSessionCommand } from '@/modules/v1/platform-admin-sessions/application';

export type UpdatePlatformAdminSessionRepositoryContract = (platformAdminSessionData: UpdatePlatformAdminSessionCommand) => Promise<void>;
