import type { Request, Response, NextFunction } from 'express';
import type { DetailPlatformAdminRoleResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import { findPlatformAdminRoleByIdQueryHandler } from '@/modules/v1/platform-admins/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const detailPlatformAdminRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await findPlatformAdminRoleByIdQueryHandler(req.body, req.lang);
    successResponseHandler<DetailPlatformAdminRoleResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
