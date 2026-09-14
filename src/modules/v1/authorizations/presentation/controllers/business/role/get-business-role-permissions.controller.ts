import type { Request, Response, NextFunction } from 'express';
import type { GetBusinessRolePermissionsResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import type { getBusinessRolePermissionsQuery } from '@/modules/v1/businesses/application';
import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth';
import { getBusinessRolePermissionsQueryHandler } from '@/modules/v1/businesses/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const getBusinessRolePermissionsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = req.query as unknown as getBusinessRolePermissionsQuery;
    const result = await getBusinessRolePermissionsQueryHandler(
      {
        ...query,
        businessRoleBusinessId: (req.user as BusinessEmployeeAuthTokenPayload | undefined)?.auth_token_business_id as string,
      },
      req.lang,
    );
    successResponseHandler<GetBusinessRolePermissionsResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
