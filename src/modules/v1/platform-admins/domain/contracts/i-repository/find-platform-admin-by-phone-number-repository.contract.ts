import type { FindPlatformAdminByPhoneNumberQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminsModel } from '@/shared/v1/database/schema/platform_admins';

export type FindPlatformAdminByPhoneNumberRepositoryContract = (platformAdminData: FindPlatformAdminByPhoneNumberQuery) => Promise<null | PlatformAdminsModel>;
