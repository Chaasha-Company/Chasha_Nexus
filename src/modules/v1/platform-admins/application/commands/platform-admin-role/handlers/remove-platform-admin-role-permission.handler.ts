import type { RemovePlatformAdminRolePermissionCommand } from '@/modules/v1/platform-admins/application';
import { deletePlatformAdminRolePermissionRepository, findPlatformAdminRoleByIdRepository, findPlatformAdminRolePermissionRepository } from '@/modules/v1/platform-admins/infrastructure';
import { findPlatformAdminPermissionByIdRepository } from '@/modules/v1/authorizations/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const removePlatformAdminRolePermissionCommandHandler = async (removePlatformAdminRolePermissionData: RemovePlatformAdminRolePermissionCommand, lang: Language): Promise<void> => {
  const platformAdminRoleIsExist = await findPlatformAdminRoleByIdRepository()({
    platformAdminRoleId: removePlatformAdminRolePermissionData.platformAdminRoleId,
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
    platformAdminPermissionId: removePlatformAdminRolePermissionData.platformAdminPermissionId,
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
    platformAdminRolePermissionRoleId: removePlatformAdminRolePermissionData.platformAdminRoleId,
    platformAdminRolePermissionPermissionId: removePlatformAdminRolePermissionData.platformAdminPermissionId,
  });

  if (platformAdminRolePermissionIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        platformAdminPermissionId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_PERMISSION_NOT_FOUND, lang)],
      },
    });
  }

  await deletePlatformAdminRolePermissionRepository()({
    platformAdminRolePermissionRoleId: removePlatformAdminRolePermissionData.platformAdminRoleId,
    platformAdminRolePermissionPermissionId: removePlatformAdminRolePermissionData.platformAdminPermissionId,
  });
};
