import type { Request, Response, NextFunction } from 'express';
import type { AssignPlatformAdminRolePermissionResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import { assignPlatformAdminRolePermissionCommandHandler } from '@/modules/v1/platform-admins/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const assignPlatformAdminRolePermissionController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await assignPlatformAdminRolePermissionCommandHandler(req.body, req.lang);
    successResponseHandler<AssignPlatformAdminRolePermissionResponseDTO>(req, res, HttpStatus.CREATED, result, t(ResponseMessages, ResponseMessage.CREATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
