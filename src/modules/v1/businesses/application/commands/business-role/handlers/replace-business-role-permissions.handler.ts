import type { ReplaceBusinessRolePermissionsCommand } from '@/modules/v1/businesses/application';
import { createBusinessRolePermissionRepository, deleteBusinessRolePermissionRepository, findBusinessRoleByIdRepository } from '@/modules/v1/businesses/infrastructure';
import { findAllBusinessPermissionByRoleIdRepository } from '@/modules/v1/authorizations/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { transactionManager } from '@/shared/v1/domain/contracts';
import { AppDataSource } from '@/shared/v1/database/core';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import { In } from 'typeorm';

export const replaceBusinessRolePermissionsCommandHandler = async (
  replaceBusinessRolePermissionsData: ReplaceBusinessRolePermissionsCommand & { businessRoleBusinessId: string },
  lang: Language,
): Promise<{
  businessRoleId: string;
  businessPermissionIds: string[];
}> => {
  const businessRoleIsExist = await findBusinessRoleByIdRepository()({
    businessRoleId: replaceBusinessRolePermissionsData.businessRoleId,
    businessRoleBusinessId: replaceBusinessRolePermissionsData.businessRoleBusinessId,
  });

  if (businessRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        businessRoleId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const businessPermissionsExist =
    replaceBusinessRolePermissionsData.businessPermissionIds.length === 0
      ? []
      : await AppDataSource.getRepository(PermissionsModel).find({
          where: {
            permissionId: In(replaceBusinessRolePermissionsData.businessPermissionIds),
          },
        });

  const existingPermissionIds = new Set(businessPermissionsExist.map((businessPermission) => businessPermission.permissionId));

  const missingPermissionIds = replaceBusinessRolePermissionsData.businessPermissionIds.filter((businessPermissionId) => !existingPermissionIds.has(businessPermissionId));

  if (missingPermissionIds.length > 0) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        businessPermissionIds: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_PERMISSION_IDS_NOT_FOUND, lang)],
      },
    });
  }

  const currentRolePermissions = await findAllBusinessPermissionByRoleIdRepository()({
    businessPermissionRoleId: replaceBusinessRolePermissionsData.businessRoleId,
  });

  const currentPermissionIds = new Set(currentRolePermissions.map((rolePermission) => rolePermission.businessRolePermissionPermissionId));
  const requestedPermissionIds = new Set(replaceBusinessRolePermissionsData.businessPermissionIds);

  const permissionIdsToRemove = [...currentPermissionIds].filter((permissionId) => !requestedPermissionIds.has(permissionId));
  const permissionIdsToAdd = [...requestedPermissionIds].filter((permissionId) => !currentPermissionIds.has(permissionId));

  await transactionManager(async (manager) => {
    for (const permissionId of permissionIdsToRemove) {
      await deleteBusinessRolePermissionRepository()(
        {
          businessRoleId: replaceBusinessRolePermissionsData.businessRoleId,
          businessPermissionId: permissionId,
        },
        manager,
      );
    }

    for (const permissionId of permissionIdsToAdd) {
      await createBusinessRolePermissionRepository()(
        {
          businessRoleId: replaceBusinessRolePermissionsData.businessRoleId,
          businessPermissionId: permissionId,
        },
        manager,
      );
    }
  });

  return {
    businessRoleId: replaceBusinessRolePermissionsData.businessRoleId,
    businessPermissionIds: [...requestedPermissionIds],
  };
};
