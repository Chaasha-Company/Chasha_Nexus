import type { getBusinessRolePermissionsQuery } from '../get-business-role-permissions.query';
import type { GetBusinessRolePermissionsQueryResult } from '../results';
import { findBusinessRoleByIdRepository } from '@/modules/v1/businesses/infrastructure';
import { getAllBusinessPermissionQueryHandler } from '@/modules/v1/authorizations/application';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const getBusinessRolePermissionsQueryHandler = async (businessRoleData: getBusinessRolePermissionsQuery & { businessRoleBusinessId: string }, lang: Language): GetBusinessRolePermissionsQueryResult => {
  const businessRoleIsExist = await findBusinessRoleByIdRepository()({
    businessRoleId: businessRoleData.businessRoleId,
    businessRoleBusinessId: businessRoleData.businessRoleBusinessId,
  });

  if (businessRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        businessRoleId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  return await getAllBusinessPermissionQueryHandler({
    businessPermissionRoleId: businessRoleData.businessRoleId,
  });
};
