import type { CreatePlatformAdminRoleCommandResult } from '../results';
import type { CreatePlatformAdminRoleRequestDTO } from '@/modules/v1/authorizations/presentation';
import { createPlatformAdminRoleRepository, findPlatformAdminRoleByKeyRepository } from '@/modules/v1/platform-admins/infrastructure';
import { throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const createPlatformAdminRoleCommandHandler = async (createPlatformAdminRoleData: CreatePlatformAdminRoleRequestDTO, lang: Language): CreatePlatformAdminRoleCommandResult => {
  const platformAdminRoleIsExist = await findPlatformAdminRoleByKeyRepository()({ platformAdminRoleKey: createPlatformAdminRoleData.platformAdminRoleKey as string });

  if (platformAdminRoleIsExist !== null) {
    throwRequestConflictException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        platformAdminRoleKey: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ALREADY_EXISTS, lang)],
      },
    });
  }

  return await createPlatformAdminRoleRepository()({
    platformAdminRoleKey: createPlatformAdminRoleData.platformAdminRoleKey as string,
    platformAdminRoleNameFa: createPlatformAdminRoleData.platformAdminRoleNameFa as string,
    platformAdminRoleNameEn: createPlatformAdminRoleData.platformAdminRoleNameEn as string,
    platformAdminRoleDescriptionFa: (createPlatformAdminRoleData.platformAdminRoleDescriptionFa as string | undefined) ?? null,
    platformAdminRoleDescriptionEn: (createPlatformAdminRoleData.platformAdminRoleDescriptionEn as string | undefined) ?? null,
  });
};
