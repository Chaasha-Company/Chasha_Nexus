import type { Request, Response, NextFunction } from 'express';
import type { DetailEarlyAccessRequestReponseDTO } from '@/modules/v1/early-access-requests/presentation';
import { findEarlyAccessRequestByIdQueryHandler } from '@/modules/v1/early-access-requests/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const detailEarlyAccessRequestController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await findEarlyAccessRequestByIdQueryHandler(req.body, req.lang);
    successResponseHandler<DetailEarlyAccessRequestReponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
