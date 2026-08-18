import type { Request, Response, NextFunction } from 'express';
import type { GetAllBusinessPermissionResponseDTO } from '@/modules/v1/authorizations/presentation';
import { getAllBusinessPermissionQueryHandler } from '@/modules/v1/authorizations/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const getAllBusinessPermissionController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await getAllBusinessPermissionQueryHandler({
      businessPermissionRoleId: req.user?.auth_token_role_id as string,
    });
    successResponseHandler<GetAllBusinessPermissionResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
