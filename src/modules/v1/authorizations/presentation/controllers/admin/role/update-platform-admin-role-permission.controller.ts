import type { Request, Response, NextFunction } from 'express';
import type { UpdatePlatformAdminRolePermissionResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import { updatePlatformAdminRolePermissionCommandHandler } from '@/modules/v1/platform-admins/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const updatePlatformAdminRolePermissionController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await updatePlatformAdminRolePermissionCommandHandler(req.body, req.lang);
    successResponseHandler<UpdatePlatformAdminRolePermissionResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.UPDATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
