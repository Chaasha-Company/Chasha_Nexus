import type { AssignBusinessRolePermissionCommand } from '@/modules/v1/businesses/application';
import type { AssignBusinessRolePermissionCommandResult } from '../results';
import { createBusinessRolePermissionRepository, findBusinessRoleByIdRepository, findBusinessRolePermissionRepository } from '@/modules/v1/businesses/infrastructure';
import { findPlatformAdminPermissionByIdRepository } from '@/modules/v1/authorizations/infrastructure';
import { throwNotFoundException, throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const assignBusinessRolePermissionCommandHandler = async (assignBusinessRolePermissionData: AssignBusinessRolePermissionCommand & { businessRoleBusinessId: string }, lang: Language): Promise<AssignBusinessRolePermissionCommandResult> => {
  const businessRoleIsExist = await findBusinessRoleByIdRepository()({
    businessRoleId: assignBusinessRolePermissionData.businessRoleId,
    businessRoleBusinessId: assignBusinessRolePermissionData.businessRoleBusinessId,
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
    platformAdminPermissionId: assignBusinessRolePermissionData.businessPermissionId,
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
    businessRolePermissionBusinessRoleId: assignBusinessRolePermissionData.businessRoleId,
    businessRolePermissionPermissionId: assignBusinessRolePermissionData.businessPermissionId,
  });

  if (businessRolePermissionIsExist !== null) {
    throwRequestConflictException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        businessPermissionId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_PERMISSION_ALREADY_EXISTS, lang)],
      },
    });
  }

  return await createBusinessRolePermissionRepository()({
    businessRoleId: assignBusinessRolePermissionData.businessRoleId,
    businessPermissionId: assignBusinessRolePermissionData.businessPermissionId,
  });
};
