import type { DeleteBusinessRoleCommand } from '@/modules/v1/businesses/application';
import { countBusinessRoleEmployeesRepository, deleteBusinessRolePermissionsRepository, deleteBusinessRoleRepository, findBusinessRoleByIdRepository } from '@/modules/v1/businesses/infrastructure';
import { throwNotFoundException, throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { invalidateCache, transactionManager } from '@/shared/v1/domain/contracts';

export const deleteBusinessRoleCommandHandler = async (deleteBusinessRoleData: DeleteBusinessRoleCommand, lang: Language): Promise<void> => {
  const businessRoleIsExist = await findBusinessRoleByIdRepository()({
    businessRoleId: deleteBusinessRoleData.businessRoleId,
    businessRoleBusinessId: deleteBusinessRoleData.businessRoleBusinessId,
  });

  if (businessRoleIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        businessRoleId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const businessRoleEmployeesCount = await countBusinessRoleEmployeesRepository()({
    businessRoleId: deleteBusinessRoleData.businessRoleId,
    businessRoleBusinessId: deleteBusinessRoleData.businessRoleBusinessId,
  });

  if (businessRoleEmployeesCount > 0) {
    throwRequestConflictException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        businessRoleId: [t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_IN_USE, lang)],
      },
    });
  }

  await transactionManager(async (manager) => {
    await deleteBusinessRolePermissionsRepository()(
      {
        businessRoleId: deleteBusinessRoleData.businessRoleId,
        businessPermissionIds: [],
      },
      manager,
    );

    await deleteBusinessRoleRepository()(
      {
        businessRoleId: deleteBusinessRoleData.businessRoleId,
        businessRoleBusinessId: deleteBusinessRoleData.businessRoleBusinessId,
      },
      manager,
    );
  });

  await invalidateCache(['business-roles']);
};
