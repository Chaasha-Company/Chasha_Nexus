import type { DeletePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import { countPlatformAdminRoleAdminsRepository, deletePlatformAdminRolePermissionsRepository, deletePlatformAdminRoleRepository, findPlatformAdminRoleByIdRepository } from '@/modules/v1/platform-admins/infrastructure';
import { throwNotFoundException, throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { AppDataSource } from '@/shared/v1/database/core';
import { transactionManager } from '@/shared/v1/database/transaction';

export const deletePlatformAdminRoleCommandHandler = async (deletePlatformAdminRoleData: DeletePlatformAdminRoleCommand, lang: Language): Promise<void> => {
  const platformAdminRoleIsExist = await findPlatformAdminRoleByIdRepository()({
    platformAdminRoleId: deletePlatformAdminRoleData.platformAdminRoleId,
  });

  if (platformAdminRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        platformAdminRoleId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const platformAdminRoleAdminsCount = await countPlatformAdminRoleAdminsRepository()({
    platformAdminRoleId: deletePlatformAdminRoleData.platformAdminRoleId,
  });

  if (platformAdminRoleAdminsCount > 0) {
    throwRequestConflictException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        platformAdminRoleId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_IN_USE, lang)],
      },
    });
  }

  await transactionManager(async (manager) => {
    await deletePlatformAdminRolePermissionsRepository()(
      {
        platformAdminRoleId: deletePlatformAdminRoleData.platformAdminRoleId,
      },
      manager,
    );

    await deletePlatformAdminRoleRepository()(
      {
        platformAdminRoleId: deletePlatformAdminRoleData.platformAdminRoleId,
      },
      manager,
    );
  });

  await AppDataSource.queryResultCache?.remove(['platform-admin-roles']);
};
