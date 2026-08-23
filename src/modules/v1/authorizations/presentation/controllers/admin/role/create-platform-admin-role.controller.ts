import type { Request, Response, NextFunction } from 'express';
import type { CreatePlatformAdminRoleResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import { createPlatformAdminRoleCommandHandler } from '@/modules/v1/platform-admins/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const createPlatformAdminRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createPlatformAdminRoleCommandHandler(req.body, req.lang);
    successResponseHandler<CreatePlatformAdminRoleResponseDTO>(req, res, HttpStatus.CREATED, result, t(ResponseMessages, ResponseMessage.CREATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
