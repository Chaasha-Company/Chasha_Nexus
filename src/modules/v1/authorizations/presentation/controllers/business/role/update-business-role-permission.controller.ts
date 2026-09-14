import type { Request, Response, NextFunction } from 'express';
import type { UpdateBusinessRolePermissionResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth';
import { updateBusinessRolePermissionCommandHandler } from '@/modules/v1/businesses/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const updateBusinessRolePermissionController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await updateBusinessRolePermissionCommandHandler(
      {
        ...req.body,
        businessRoleBusinessId: (req.user as BusinessEmployeeAuthTokenPayload | undefined)?.auth_token_business_id as string,
      },
      req.lang,
    );
    successResponseHandler<UpdateBusinessRolePermissionResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.UPDATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
