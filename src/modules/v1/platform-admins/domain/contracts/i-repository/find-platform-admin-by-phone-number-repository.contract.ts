import type { FindPlatformAdminByPhoneNumberQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminsModel } from '@/shared/v1/database/schema/platform_admins';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindPlatformAdminByPhoneNumberRepositoryContract = (platformAdminData: FindPlatformAdminByPhoneNumberQuery, ctx?: TransactionContext) => Promise<null | PlatformAdminsModel>;
