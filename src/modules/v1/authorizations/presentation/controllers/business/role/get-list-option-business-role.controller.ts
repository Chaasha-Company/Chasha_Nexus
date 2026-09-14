import type { Request, Response, NextFunction } from 'express';
import type { GetListOptionBusinessRoleResponseDTO } from '@/modules/v1/authorizations/presentation/dtos';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api';
import { getBusinessRoleListOptionQueryHandler } from '@/modules/v1/businesses/application';

export const getListOptionBusinessRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await getBusinessRoleListOptionQueryHandler();
    successResponseHandler<GetListOptionBusinessRoleResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
