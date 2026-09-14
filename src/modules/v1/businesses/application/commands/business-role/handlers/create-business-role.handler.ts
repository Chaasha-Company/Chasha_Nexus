import type { CreateBusinessRoleCommandResult } from '../results';
import type { CreateBusinessRoleCommand } from '@/modules/v1/businesses/application';
import { createBusinessRoleRepository, findBusinessRoleByKeyRepository } from '@/modules/v1/businesses/infrastructure';
import { throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const createBusinessRoleCommandHandler = async (createBusinessRoleData: CreateBusinessRoleCommand, lang: Language): Promise<CreateBusinessRoleCommandResult> => {
  const businessRoleIsExist = await findBusinessRoleByKeyRepository()({
    businessRoleBusinessId: createBusinessRoleData.businessRoleBusinessId,
    businessRoleKey: createBusinessRoleData.businessRoleKey,
  });

  if (businessRoleIsExist !== null) {
    throwRequestConflictException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        businessRoleKey: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ALREADY_EXISTS, lang)],
      },
    });
  }

  return await createBusinessRoleRepository()({
    businessRoleBusinessId: createBusinessRoleData.businessRoleBusinessId,
    businessRoleKey: createBusinessRoleData.businessRoleKey,
    businessRoleNameFa: createBusinessRoleData.businessRoleNameFa,
    businessRoleNameEn: createBusinessRoleData.businessRoleNameEn,
    businessRoleDescriptionFa: createBusinessRoleData.businessRoleDescriptionFa,
    businessRoleDescriptionEn: createBusinessRoleData.businessRoleDescriptionEn,
  });
};
