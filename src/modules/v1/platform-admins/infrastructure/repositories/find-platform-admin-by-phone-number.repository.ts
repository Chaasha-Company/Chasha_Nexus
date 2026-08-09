import type { FindPlatformAdminByPhoneNumberRepositoryContract } from '@/modules/v1/platform-admins/domain';
import type { FindPlatformAdminByPhoneNumberQuery } from '@/modules/v1/platform-admins/application';
import type { EntityManager } from 'typeorm';
import { PlatformAdminsModel } from '@/shared/v1/database/schema/platform_admins';
import { AppDataSource } from '@/shared/v1/database/core';

export const findPlatformAdminByPhoneNumberRepository =
  (): FindPlatformAdminByPhoneNumberRepositoryContract =>
  async (platformAdminData: FindPlatformAdminByPhoneNumberQuery, manager?: EntityManager): Promise<null | PlatformAdminsModel> => {
    const platformAdminRepository = manager ? manager.getRepository(PlatformAdminsModel) : AppDataSource.getRepository(PlatformAdminsModel);

    return await platformAdminRepository.findOne({
      where: {
        platformAdminPhoneNumber: platformAdminData.platformAdminPhoneNumber,
      },
    });
  };
