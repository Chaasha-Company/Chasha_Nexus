import type { UpdateBusinessRolePermissionCommand } from '@/modules/v1/businesses/application';
import { createBusinessRolePermissionRepository, deleteBusinessRolePermissionRepository, findBusinessRoleByIdRepository, findBusinessRolePermissionRepository, restoreBusinessRolePermissionRepository } from '@/modules/v1/businesses/infrastructure';
import { findPlatformAdminPermissionByIdRepository } from '@/modules/v1/authorizations/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { transactionManager } from '@/shared/v1/domain/contracts';

export const updateBusinessRolePermissionCommandHandler = async (
  updateBusinessRolePermissionData: UpdateBusinessRolePermissionCommand & { businessRoleBusinessId: string },
  lang: Language,
): Promise<{
  businessRoleId: string;
  businessPermissionId: string;
  enabled: boolean;
}> => {
  const businessRoleIsExist = await findBusinessRoleByIdRepository()({
    businessRoleId: updateBusinessRolePermissionData.businessRoleId,
    businessRoleBusinessId: updateBusinessRolePermissionData.businessRoleBusinessId,
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
    platformAdminPermissionId: updateBusinessRolePermissionData.businessPermissionId,
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
    businessRolePermissionBusinessRoleId: updateBusinessRolePermissionData.businessRoleId,
    businessRolePermissionPermissionId: updateBusinessRolePermissionData.businessPermissionId,
  });

  if (businessRolePermissionIsExist !== null && businessRolePermissionIsExist.businessRolePermissionDeletedAt === null) {
    await transactionManager(async (manager) => {
      await deleteBusinessRolePermissionRepository()(
        {
          businessRoleId: updateBusinessRolePermissionData.businessRoleId,
          businessPermissionId: updateBusinessRolePermissionData.businessPermissionId,
        },
        manager,
      );
    });

    return {
      businessRoleId: updateBusinessRolePermissionData.businessRoleId,
      businessPermissionId: updateBusinessRolePermissionData.businessPermissionId,
      enabled: false,
    };
  }

  if (businessRolePermissionIsExist !== null && businessRolePermissionIsExist.businessRolePermissionDeletedAt !== null) {
    await transactionManager(async (manager) => {
      await restoreBusinessRolePermissionRepository()(
        {
          businessRoleId: updateBusinessRolePermissionData.businessRoleId,
          businessPermissionId: updateBusinessRolePermissionData.businessPermissionId,
        },
        manager,
      );
    });

    return {
      businessRoleId: updateBusinessRolePermissionData.businessRoleId,
      businessPermissionId: updateBusinessRolePermissionData.businessPermissionId,
      enabled: true,
    };
  }

  await transactionManager(async (manager) => {
    await createBusinessRolePermissionRepository()(
      {
        businessRoleId: updateBusinessRolePermissionData.businessRoleId,
        businessPermissionId: updateBusinessRolePermissionData.businessPermissionId,
      },
      manager,
    );
  });

  return {
    businessRoleId: updateBusinessRolePermissionData.businessRoleId,
    businessPermissionId: updateBusinessRolePermissionData.businessPermissionId,
    enabled: true,
  };
};
