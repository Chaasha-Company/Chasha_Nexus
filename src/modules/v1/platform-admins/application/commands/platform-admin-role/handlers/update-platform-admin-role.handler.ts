import type { UpdatePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import { findPlatformAdminRoleByIdRepository, updatePlatformAdminRoleRepository } from '@/modules/v1/platform-admins/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const updatePlatformAdminRoleCommandHandler = async (updatePlatformAdminRoleData: UpdatePlatformAdminRoleCommand, lang: Language): Promise<void> => {
  const platformAdminRoleIsExist = await findPlatformAdminRoleByIdRepository()({
    platformAdminRoleId: updatePlatformAdminRoleData.platformAdminRoleId,
  });

  if (platformAdminRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        platformAdminRoleId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const { platformAdminRoleId, ...updateData } = updatePlatformAdminRoleData;

  await updatePlatformAdminRoleRepository()({
    platformAdminRoleId,
    ...updateData,
  });
};
