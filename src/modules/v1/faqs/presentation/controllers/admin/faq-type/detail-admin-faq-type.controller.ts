import type { Request, Response, NextFunction } from 'express';
import type { DetailAdminFaqTypeResponseDTO } from '@/modules/v1/faqs/presentation/dtos';
import { findAdminFaqTypeByIdQueryHandler } from '@/modules/v1/faqs/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const detailAdminFaqTypeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await findAdminFaqTypeByIdQueryHandler(req.body, req.lang);
    successResponseHandler<DetailAdminFaqTypeResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
