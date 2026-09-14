import type { Request, Response, NextFunction } from 'express';
import type { CreateBusinessRoleResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth';
import { createBusinessRoleCommandHandler } from '@/modules/v1/businesses/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const createBusinessRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createBusinessRoleCommandHandler(
      {
        ...req.body,
        businessRoleBusinessId: (req.user as BusinessEmployeeAuthTokenPayload | undefined)?.auth_token_business_id as string,
      },
      req.lang,
    );
    successResponseHandler<CreateBusinessRoleResponseDTO>(req, res, HttpStatus.CREATED, result, t(ResponseMessages, ResponseMessage.CREATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
