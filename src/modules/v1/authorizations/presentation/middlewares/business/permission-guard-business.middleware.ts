import type { Request, Response, NextFunction } from 'express';
import type { PermissionActionEnum } from '@/modules/v1/authorizations/domain';
import { throwNotFoundException, throwUnAuthorizedException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { findBusinessRoleByIdRepository } from '@/modules/v1/businesses';

export const permissionGuardBusinessMiddleware =
  ({ businessPermissionModule, businessPermissionAction }: { businessPermissionModule: string; businessPermissionAction: PermissionActionEnum }) =>
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

    const hasPermission = businessRole.businessRolePermissions.some(
      (rolePermission) => rolePermission.businessRolePermissionPermission.permissionModule === businessPermissionModule && rolePermission.businessRolePermissionPermission.permissionAction === businessPermissionAction,
    );

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
