import type { FindBusinessRoleByIdQueryResult } from '../results';
import type { findBusinessRoleByIdQuery } from '../find-business-role-by-id.query';

import { findBusinessRoleByIdRepository } from '@/modules/v1/businesses/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const findBusinessRoleByIdQueryHandler = async (businessRoleData: findBusinessRoleByIdQuery & { businessRoleBusinessId: string }, lang: Language): FindBusinessRoleByIdQueryResult => {
  const data = await findBusinessRoleByIdRepository()({
    businessRoleId: businessRoleData.businessRoleId,
    businessRoleBusinessId: businessRoleData.businessRoleBusinessId,
  });

  if (data === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        businessRoleId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  return {
    businessRoleId: data!.businessRoleId,

    businessRoleKey: data!.businessRoleKey,

    businessRoleNameFa: data!.businessRoleNameFa,

    businessRoleNameEn: data!.businessRoleNameEn,

    businessRoleDescriptionFa: data!.businessRoleDescriptionFa,

    businessRoleDescriptionEn: data!.businessRoleDescriptionEn,

    businessRoleIsActive: data!.businessRoleIsActive,

    businessRoleCreatedAt: data!.businessRoleCreatedAt,

    businessRoleUpdatedAt: data!.businessRoleUpdatedAt,

    businessRolePermissions: data!.businessRolePermissions.map((businessRolePermission) => ({
      businessRolePermissionId: businessRolePermission.businessRolePermissionId,

      businessRolePermissionPermission: {
        permissionId: businessRolePermission.businessRolePermissionPermission.permissionId,

        permissionKey: businessRolePermission.businessRolePermissionPermission.permissionKey,

        permissionSubject: businessRolePermission.businessRolePermissionPermission.permissionSubject,

        permissionResource: businessRolePermission.businessRolePermissionPermission.permissionResource,

        permissionVersion: businessRolePermission.businessRolePermissionPermission.permissionVersion,

        permissionModule: businessRolePermission.businessRolePermissionPermission.permissionModule,

        permissionAction: businessRolePermission.businessRolePermissionPermission.permissionAction,

        permissionType: businessRolePermission.businessRolePermissionPermission.permissionType,

        permissionLabelFa: businessRolePermission.businessRolePermissionPermission.permissionLabelFa,

        permissionLabelEn: businessRolePermission.businessRolePermissionPermission.permissionLabelEn,

        permissionDescriptionFa: businessRolePermission.businessRolePermissionPermission.permissionDescriptionFa,

        permissionDescriptionEn: businessRolePermission.businessRolePermissionPermission.permissionDescriptionEn,

        permissionNavigation: businessRolePermission.businessRolePermissionPermission.permissionNavigation,

        permissionIsActive: businessRolePermission.businessRolePermissionPermission.permissionIsActive,
      },
    })),
  };
};
