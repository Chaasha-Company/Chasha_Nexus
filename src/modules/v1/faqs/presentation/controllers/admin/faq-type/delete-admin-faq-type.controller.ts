import type { Request, Response, NextFunction } from 'express';
import { deleteAdminFaqTypeCommandHandler } from '@/modules/v1/faqs/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const deleteAdminFaqTypeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteAdminFaqTypeCommandHandler(req.body, req.lang);
    successResponseHandler(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.DELETED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
