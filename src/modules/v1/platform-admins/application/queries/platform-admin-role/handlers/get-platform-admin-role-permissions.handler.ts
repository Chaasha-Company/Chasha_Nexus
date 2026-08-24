import type { getPlatformAdminRolePermissionsQuery } from '../get-platform-admin-role-permissions.query';
import type { GetPlatformAdminRolePermissionsQueryResult } from '../results';
import { findPlatformAdminRoleByIdRepository } from '@/modules/v1/platform-admins/infrastructure';
import { getAllPlatformAdminPermissionQueryHandler } from '@/modules/v1/authorizations/application';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const getPlatformAdminRolePermissionsQueryHandler = async (platformAdminRoleData: getPlatformAdminRolePermissionsQuery, lang: Language): GetPlatformAdminRolePermissionsQueryResult => {
  const platformAdminRoleIsExist = await findPlatformAdminRoleByIdRepository()({
    platformAdminRoleId: platformAdminRoleData.platformAdminRoleId,
  });

  if (platformAdminRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        platformAdminRoleId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  return await getAllPlatformAdminPermissionQueryHandler({
    platformAdminPermissionRoleId: platformAdminRoleData.platformAdminRoleId,
  });
};
