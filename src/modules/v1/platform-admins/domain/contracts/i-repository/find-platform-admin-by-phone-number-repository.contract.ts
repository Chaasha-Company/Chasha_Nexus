import type { FindPlatformAdminByPhoneNumberQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminsEntity } from '@/modules/v1/platform-admins/domain/entities';

export type FindPlatformAdminByPhoneNumberRepositoryContract = (platformAdminData: FindPlatformAdminByPhoneNumberQuery) => Promise<null | PlatformAdminsEntity>;
