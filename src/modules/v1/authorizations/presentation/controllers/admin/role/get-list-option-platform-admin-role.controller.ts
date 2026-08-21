import type { Request, Response, NextFunction } from 'express';
import type { GetListOptionPlatformAdminRoleResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api';
import { getListOptionPlatformAdminRoleQueryHandler } from '@/modules/v1/platform-admins/application';

export const getListOptionPlatformAdminRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await getListOptionPlatformAdminRoleQueryHandler();
    successResponseHandler<GetListOptionPlatformAdminRoleResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
