import type { Request, Response, NextFunction } from 'express';
import type { PermissionActionEnum, PermissionResourceEnum } from '@/modules/v1/authorizations/domain';
import { findPlatformAdminRoleByIdRepository } from '@/modules/v1/platform-admins';
import { throwNotFoundException, throwUnAuthorizedException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

export const permissionGuardPlatformAdminMiddleware =
  ({ platformAdminPermissionModule, platformAdminPermissionResource, platformAdminPermissionAction }: { platformAdminPermissionModule: string; platformAdminPermissionResource: PermissionResourceEnum; platformAdminPermissionAction: PermissionActionEnum }) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const adminAuthData = req.user;

    const platformAdminRole = await findPlatformAdminRoleByIdRepository()({
      platformAdminRoleId: adminAuthData?.auth_token_role_id as string,
    });

    if (!platformAdminRole) {
      throwNotFoundException({
        message: t(ResponseMessages, ResponseMessage.NOT_FOUND, req.lang),
        details: {
          error_message: [t(ValidationMessages, ValidationMessage.AUTHORIZATION_PLATFORM_ADMIN_ROLE_NOT_FOUND, req.lang)],
        },
      });

      return;
    }

    const hasPermission = platformAdminRole.platformAdminRolePermissions.some((rolePermission) => {
      const permission = rolePermission.platformAdminRolePermissionPermission;

      return permission.permissionModule === platformAdminPermissionModule && permission.permissionResource === platformAdminPermissionResource && permission.permissionAction === platformAdminPermissionAction && permission.permissionIsActive === true;
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
