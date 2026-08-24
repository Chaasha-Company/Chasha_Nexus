import type { ReplacePlatformAdminRolePermissionsCommand } from '@/modules/v1/platform-admins/application';
import type { ReplacePlatformAdminRolePermissionsCommandResult } from '../results';
import { createPlatformAdminRolePermissionRepository, deletePlatformAdminRolePermissionRepository, findPlatformAdminRoleByIdRepository } from '@/modules/v1/platform-admins/infrastructure';
import { findPlatformAdminPermissionsByIdsRepository, findAllPlatformAdminPermissionByRoleIdRepository } from '@/modules/v1/authorizations/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { transactionManager } from '@/shared/v1/database/transaction';

export const replacePlatformAdminRolePermissionsCommandHandler = async (replacePlatformAdminRolePermissionsData: ReplacePlatformAdminRolePermissionsCommand, lang: Language): ReplacePlatformAdminRolePermissionsCommandResult => {
  const platformAdminRoleIsExist = await findPlatformAdminRoleByIdRepository()({
    platformAdminRoleId: replacePlatformAdminRolePermissionsData.platformAdminRoleId,
  });

  if (platformAdminRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        platformAdminRoleId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const platformAdminPermissionsExist = await findPlatformAdminPermissionsByIdsRepository()({
    platformAdminPermissionIds: replacePlatformAdminRolePermissionsData.platformAdminPermissionIds,
  });

  const existingPermissionIds = new Set(platformAdminPermissionsExist.map((platformAdminPermission) => platformAdminPermission.permissionId));

  const missingPermissionIds = replacePlatformAdminRolePermissionsData.platformAdminPermissionIds.filter((platformAdminPermissionId) => !existingPermissionIds.has(platformAdminPermissionId));

  if (missingPermissionIds.length > 0) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        platformAdminPermissionIds: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_PERMISSION_IDS_NOT_FOUND, lang)],
      },
    });
  }

  const currentRolePermissions = await findAllPlatformAdminPermissionByRoleIdRepository()({
    platformAdminPermissionRoleId: replacePlatformAdminRolePermissionsData.platformAdminRoleId,
  });

  const currentPermissionIds = new Set(currentRolePermissions.map((rolePermission) => rolePermission.platformAdminRolePermissionPermissionId));
  const requestedPermissionIds = new Set(replacePlatformAdminRolePermissionsData.platformAdminPermissionIds);

  const permissionIdsToRemove = [...currentPermissionIds].filter((permissionId) => !requestedPermissionIds.has(permissionId));
  const permissionIdsToAdd = [...requestedPermissionIds].filter((permissionId) => !currentPermissionIds.has(permissionId));

  await transactionManager(async (manager) => {
    for (const permissionId of permissionIdsToRemove) {
      await deletePlatformAdminRolePermissionRepository()(
        {
          platformAdminRolePermissionRoleId: replacePlatformAdminRolePermissionsData.platformAdminRoleId,
          platformAdminRolePermissionPermissionId: permissionId,
        },
        manager,
      );
    }

    for (const permissionId of permissionIdsToAdd) {
      await createPlatformAdminRolePermissionRepository()(
        {
          platformAdminRolePermissionRoleId: replacePlatformAdminRolePermissionsData.platformAdminRoleId,
          platformAdminRolePermissionPermissionId: permissionId,
        },
        manager,
      );
    }
  });

  return {
    platformAdminRoleId: replacePlatformAdminRolePermissionsData.platformAdminRoleId,
    platformAdminPermissionIds: [...requestedPermissionIds],
  };
};
