import type { Request, Response, NextFunction } from 'express';
import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth';
import { removeBusinessRolePermissionCommandHandler } from '@/modules/v1/businesses/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const removeBusinessRolePermissionController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await removeBusinessRolePermissionCommandHandler(
      {
        ...req.body,
        businessRoleBusinessId: (req.user as BusinessEmployeeAuthTokenPayload | undefined)?.auth_token_business_id as string,
      },
      req.lang,
    );
    successResponseHandler(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.DELETED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
