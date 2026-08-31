import type { FindPlatformAdminByPhoneNumberRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { FindPlatformAdminByPhoneNumberQuery } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';
import { PlatformAdminsModel } from '@/shared/v1/database/schema/platform_admins';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminByPhoneNumberRepository =
  (): FindPlatformAdminByPhoneNumberRepositoryContract =>
  async (platformAdminData: FindPlatformAdminByPhoneNumberQuery, ctx?: TransactionContext): Promise<null | PlatformAdminsModel> => {
    const platformAdminRepository = ctx ? ctx.getRepository(PlatformAdminsModel) : AppDataSource.getRepository(PlatformAdminsModel);

    return await platformAdminRepository.findOne({
      where: {
        platformAdminPhoneNumber: platformAdminData.platformAdminPhoneNumber,
      },
    });
  };
