import type { Request, Response, NextFunction } from 'express';
import { updatePlatformAdminRoleCommandHandler } from '@/modules/v1/platform-admins/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const updatePlatformAdminRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await updatePlatformAdminRoleCommandHandler(req.body, req.lang);
    successResponseHandler(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.UPDATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
