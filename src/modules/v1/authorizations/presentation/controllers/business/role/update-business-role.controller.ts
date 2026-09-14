import type { Request, Response, NextFunction } from 'express';
import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth';
import { updateBusinessRoleCommandHandler } from '@/modules/v1/businesses/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const updateBusinessRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await updateBusinessRoleCommandHandler(
      {
        ...req.body,
        businessRoleBusinessId: (req.user as BusinessEmployeeAuthTokenPayload | undefined)?.auth_token_business_id as string,
      },
      req.lang,
    );
    successResponseHandler(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.UPDATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
