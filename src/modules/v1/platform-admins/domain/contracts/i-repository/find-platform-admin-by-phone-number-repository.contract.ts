import type { FindPlatformAdminByPhoneNumberQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminsModel } from '@/shared/v1/database/schema/platform_admins';
import type { EntityManager } from 'typeorm';

export type FindPlatformAdminByPhoneNumberRepositoryContract = (platformAdminData: FindPlatformAdminByPhoneNumberQuery, manager?: EntityManager) => Promise<null | PlatformAdminsModel>;
