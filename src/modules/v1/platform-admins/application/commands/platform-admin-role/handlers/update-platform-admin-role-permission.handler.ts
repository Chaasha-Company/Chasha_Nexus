import type { UpdatePlatformAdminRolePermissionCommand } from '@/modules/v1/platform-admins/application';
import type { UpdatePlatformAdminRolePermissionCommandResult } from '../results';
import {
  createPlatformAdminRolePermissionRepository,
  deletePlatformAdminRolePermissionRepository,
  findPlatformAdminRoleByIdRepository,
  findPlatformAdminRolePermissionRepository,
  restorePlatformAdminRolePermissionRepository,
} from '@/modules/v1/platform-admins/infrastructure';
import { findPlatformAdminPermissionByIdRepository } from '@/modules/v1/authorizations/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { transactionManager } from '@/shared/v1/domain/contracts';

export const updatePlatformAdminRolePermissionCommandHandler = async (updatePlatformAdminRolePermissionData: UpdatePlatformAdminRolePermissionCommand, lang: Language): UpdatePlatformAdminRolePermissionCommandResult => {
  const platformAdminRoleIsExist = await findPlatformAdminRoleByIdRepository()({
    platformAdminRoleId: updatePlatformAdminRolePermissionData.platformAdminRoleId,
  });

  if (platformAdminRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        platformAdminRoleId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const platformAdminPermissionIsExist = await findPlatformAdminPermissionByIdRepository()({
    platformAdminPermissionId: updatePlatformAdminRolePermissionData.platformAdminPermissionId,
  });

  if (platformAdminPermissionIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        platformAdminPermissionId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_PERMISSION_ID_NOT_FOUND, lang)],
      },
    });
  }

  const platformAdminRolePermissionIsExist = await findPlatformAdminRolePermissionRepository()({
    platformAdminRolePermissionRoleId: updatePlatformAdminRolePermissionData.platformAdminRoleId,
    platformAdminRolePermissionPermissionId: updatePlatformAdminRolePermissionData.platformAdminPermissionId,
  });

  if (updatePlatformAdminRolePermissionData.enabled) {
    if (platformAdminRolePermissionIsExist !== null) {
      if (platformAdminRolePermissionIsExist.platformAdminRolePermissionDeletedAt !== null) {
        await transactionManager(async (manager) => {
          await restorePlatformAdminRolePermissionRepository()(
            {
              platformAdminRolePermissionRoleId: updatePlatformAdminRolePermissionData.platformAdminRoleId,
              platformAdminRolePermissionPermissionId: updatePlatformAdminRolePermissionData.platformAdminPermissionId,
            },
            manager,
          );
        });
      }
      return {
        platformAdminRoleId: updatePlatformAdminRolePermissionData.platformAdminRoleId,
        permissionId: updatePlatformAdminRolePermissionData.platformAdminPermissionId,
        enabled: true,
      };
    }

    await transactionManager(async (manager) => {
      await createPlatformAdminRolePermissionRepository()(
        {
          platformAdminRolePermissionRoleId: updatePlatformAdminRolePermissionData.platformAdminRoleId,
          platformAdminRolePermissionPermissionId: updatePlatformAdminRolePermissionData.platformAdminPermissionId,
        },
        manager,
      );
    });

    return {
      platformAdminRoleId: updatePlatformAdminRolePermissionData.platformAdminRoleId,
      permissionId: updatePlatformAdminRolePermissionData.platformAdminPermissionId,
      enabled: true,
    };
  }

  if (platformAdminRolePermissionIsExist === null || platformAdminRolePermissionIsExist.platformAdminRolePermissionDeletedAt !== null) {
    return {
      platformAdminRoleId: updatePlatformAdminRolePermissionData.platformAdminRoleId,
      permissionId: updatePlatformAdminRolePermissionData.platformAdminPermissionId,
      enabled: false,
    };
  }

  await transactionManager(async (manager) => {
    await deletePlatformAdminRolePermissionRepository()(
      {
        platformAdminRolePermissionRoleId: updatePlatformAdminRolePermissionData.platformAdminRoleId,
        platformAdminRolePermissionPermissionId: updatePlatformAdminRolePermissionData.platformAdminPermissionId,
      },
      manager,
    );
  });

  return {
    platformAdminRoleId: updatePlatformAdminRolePermissionData.platformAdminRoleId,
    permissionId: updatePlatformAdminRolePermissionData.platformAdminPermissionId,
    enabled: false,
  };
};
