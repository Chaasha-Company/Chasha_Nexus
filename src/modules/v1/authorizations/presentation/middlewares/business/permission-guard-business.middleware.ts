import type { Request, Response, NextFunction } from 'express';
import type { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';
import { findBusinessRoleByIdRepository } from '@/modules/v1/businesses';
import { throwNotFoundException, throwUnAuthorizedException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const permissionGuardBusinessMiddleware =
  ({ businessPermissionModule, businessPermissionResource, businessPermissionAction }: { businessPermissionModule: string; businessPermissionResource: PermissionResourceEnum; businessPermissionAction: PermissionActionEnum }) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const businessAuthData = req.user;

    const businessRole = await findBusinessRoleByIdRepository()({
      businessRoleId: businessAuthData?.auth_token_role_id as string,
    });

    if (!businessRole) {
      throwNotFoundException({
        message: t(ResponseMessages, ResponseMessage.NOT_FOUND, req.lang),
        details: {
          error_message: [t(ValidationMessages, ValidationMessage.AUTHORIZATION_BUSINESS_ROLE_NOT_FOUND, req.lang)],
        },
      });

      return;
    }

    const hasPermission = businessRole.businessRolePermissions.some((rolePermission) => {
      const permission = rolePermission.businessRolePermissionPermission;

      return permission.permissionModule === businessPermissionModule && permission.permissionResource === businessPermissionResource && permission.permissionAction === businessPermissionAction && permission.permissionIsActive === true;
    });

    if (hasPermission === false) {
      throwUnAuthorizedException({
        message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, req.lang),
        details: {
          error_message: [t(ValidationMessages, ValidationMessage.AUTHORIZATION_PERMISSION_DENIED, req.lang)],
        },
      });

      return;
    }

    next();
  };
