import type { PlatformAdminsEntity } from '@/modules/v1/platform-admins/domain/entities';
import type { FindPlatformAdminByPhoneNumberRequestDTO } from '@/modules/v1/platform-admins/presentation';

export type FindPlatformAdminByPhoneNumberRepositoryContract = (platformAdminData: FindPlatformAdminByPhoneNumberRequestDTO) => Promise<null | PlatformAdminsEntity>;
