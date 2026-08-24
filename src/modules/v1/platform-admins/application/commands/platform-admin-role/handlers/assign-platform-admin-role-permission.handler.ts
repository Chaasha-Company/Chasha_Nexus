import type { AssignPlatformAdminRolePermissionCommand } from '@/modules/v1/platform-admins/application';
import type { AssignPlatformAdminRolePermissionCommandResult } from '../results';
import { createPlatformAdminRolePermissionRepository, findPlatformAdminRoleByIdRepository, findPlatformAdminRolePermissionRepository } from '@/modules/v1/platform-admins/infrastructure';
import { findPlatformAdminPermissionByIdRepository } from '@/modules/v1/authorizations/infrastructure';
import { throwNotFoundException, throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const assignPlatformAdminRolePermissionCommandHandler = async (assignPlatformAdminRolePermissionData: AssignPlatformAdminRolePermissionCommand, lang: Language): AssignPlatformAdminRolePermissionCommandResult => {
  const platformAdminRoleIsExist = await findPlatformAdminRoleByIdRepository()({
    platformAdminRoleId: assignPlatformAdminRolePermissionData.platformAdminRoleId,
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
    platformAdminPermissionId: assignPlatformAdminRolePermissionData.platformAdminPermissionId,
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
    platformAdminRolePermissionRoleId: assignPlatformAdminRolePermissionData.platformAdminRoleId,
    platformAdminRolePermissionPermissionId: assignPlatformAdminRolePermissionData.platformAdminPermissionId,
  });

  if (platformAdminRolePermissionIsExist !== null) {
    throwRequestConflictException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        platformAdminPermissionId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_PERMISSION_ALREADY_EXISTS, lang)],
      },
    });
  }

  return await createPlatformAdminRolePermissionRepository()({
    platformAdminRolePermissionRoleId: assignPlatformAdminRolePermissionData.platformAdminRoleId,
    platformAdminRolePermissionPermissionId: assignPlatformAdminRolePermissionData.platformAdminPermissionId,
  });
};
