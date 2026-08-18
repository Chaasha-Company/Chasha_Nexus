import type { Request, Response, NextFunction } from 'express';
import { updateEarlyAccessRequestCommandHandler } from '@/modules/v1/early-access-requests/application';
import { successResponseHandler } from '@/shared/v1/helpers/api';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system';

export const updateEarlyAccessRequestController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await updateEarlyAccessRequestCommandHandler(req.body, req.lang);
    successResponseHandler<null>(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.UPDATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
