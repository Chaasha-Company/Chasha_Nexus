import type { RemoveBusinessRolePermissionCommand } from '@/modules/v1/businesses/application';
import { deleteBusinessRolePermissionRepository, findBusinessRoleByIdRepository, findBusinessRolePermissionRepository } from '@/modules/v1/businesses/infrastructure';
import { findPlatformAdminPermissionByIdRepository } from '@/modules/v1/authorizations/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const removeBusinessRolePermissionCommandHandler = async (removeBusinessRolePermissionData: RemoveBusinessRolePermissionCommand & { businessRoleBusinessId: string }, lang: Language): Promise<void> => {
  const businessRoleIsExist = await findBusinessRoleByIdRepository()({
    businessRoleId: removeBusinessRolePermissionData.businessRoleId,
    businessRoleBusinessId: removeBusinessRolePermissionData.businessRoleBusinessId,
  });

  if (businessRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        businessRoleId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const businessPermissionIsExist = await findPlatformAdminPermissionByIdRepository()({
    platformAdminPermissionId: removeBusinessRolePermissionData.businessPermissionId,
  });

  if (businessPermissionIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        businessPermissionId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_PERMISSION_ID_NOT_FOUND, lang)],
      },
    });
  }

  const businessRolePermissionIsExist = await findBusinessRolePermissionRepository()({
    businessRolePermissionBusinessRoleId: removeBusinessRolePermissionData.businessRoleId,
    businessRolePermissionPermissionId: removeBusinessRolePermissionData.businessPermissionId,
  });

  if (businessRolePermissionIsExist === null || businessRolePermissionIsExist.businessRolePermissionDeletedAt !== null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        businessPermissionId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_PERMISSION_NOT_FOUND, lang)],
      },
    });
  }

  await deleteBusinessRolePermissionRepository()({
    businessRoleId: removeBusinessRolePermissionData.businessRoleId,
    businessPermissionId: removeBusinessRolePermissionData.businessPermissionId,
  });
};
