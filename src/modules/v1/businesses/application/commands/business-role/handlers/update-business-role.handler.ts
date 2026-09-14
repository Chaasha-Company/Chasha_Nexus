import type { UpdateBusinessRoleCommand } from '@/modules/v1/businesses/application';
import { findBusinessRoleByIdRepository, updateBusinessRoleRepository } from '@/modules/v1/businesses/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const updateBusinessRoleCommandHandler = async (updateBusinessRoleData: UpdateBusinessRoleCommand, lang: Language): Promise<void> => {
  const businessRoleIsExist = await findBusinessRoleByIdRepository()({
    businessRoleId: updateBusinessRoleData.businessRoleId,
    businessRoleBusinessId: updateBusinessRoleData.businessRoleBusinessId,
  });

  if (businessRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        businessRoleId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const { businessRoleId, businessRoleBusinessId, ...updateData } = updateBusinessRoleData;

  await updateBusinessRoleRepository()({
    businessRoleId,
    businessRoleBusinessId,
    ...updateData,
  });
};
