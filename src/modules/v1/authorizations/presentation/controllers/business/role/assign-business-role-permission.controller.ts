import type { Request, Response, NextFunction } from 'express';
import type { AssignBusinessRolePermissionResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth';
import { assignBusinessRolePermissionCommandHandler } from '@/modules/v1/businesses/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const assignBusinessRolePermissionController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await assignBusinessRolePermissionCommandHandler(
      {
        ...req.body,
        businessRoleBusinessId: (req.user as BusinessEmployeeAuthTokenPayload | undefined)?.auth_token_business_id as string,
      },
      req.lang,
    );
    successResponseHandler<AssignBusinessRolePermissionResponseDTO>(req, res, HttpStatus.CREATED, result, t(ResponseMessages, ResponseMessage.CREATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
