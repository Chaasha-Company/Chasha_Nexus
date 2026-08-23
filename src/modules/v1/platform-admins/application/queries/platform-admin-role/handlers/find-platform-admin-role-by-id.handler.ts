import type { FindPlatformAdminRoleByIdQueryResult } from '../results';
import type { findPlatformAdminRoleByIdQuery } from '../find-platform-admin-role-by-id.query';

import { findPlatformAdminRoleByIdRepository } from '@/modules/v1/platform-admins/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const findPlatformAdminRoleByIdQueryHandler = async (platformAdminRoleData: findPlatformAdminRoleByIdQuery, lang: Language): FindPlatformAdminRoleByIdQueryResult => {
  const data = await findPlatformAdminRoleByIdRepository()({
    platformAdminRoleId: platformAdminRoleData.platformAdminRoleId,
  });

  if (data === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        platformAdminRoleId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const { platformAdminRoleAdmins: _platformAdminRoleAdmins, platformAdminRoleDeletedAt: _platformAdminRoleDeletedAt, ...role } = data!;

  return {
    ...role,

    platformAdminRolePermissions: role.platformAdminRolePermissions.map((platformAdminRolePermission) => ({
      platformAdminRolePermissionId: platformAdminRolePermission.platformAdminRolePermissionId,

      platformAdminRolePermissionPermission: {
        permissionId: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionId,

        permissionKey: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionKey,

        permissionSubject: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionSubject,

        permissionResource: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionResource,

        permissionVersion: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionVersion,

        permissionModule: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionModule,

        permissionAction: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionAction,

        permissionType: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionType,

        permissionLabelFa: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionLabelFa,

        permissionLabelEn: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionLabelEn,

        permissionDescriptionFa: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionDescriptionFa,

        permissionDescriptionEn: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionDescriptionEn,

        permissionNavigation: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionNavigation,

        permissionIsActive: platformAdminRolePermission.platformAdminRolePermissionPermission.permissionIsActive,
      },
    })),
  };
};
