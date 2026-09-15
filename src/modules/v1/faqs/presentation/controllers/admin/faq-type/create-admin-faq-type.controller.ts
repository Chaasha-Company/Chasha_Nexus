import type { Request, Response, NextFunction } from 'express';
import type { CreateAdminFaqTypeResponseDTO } from '@/modules/v1/faqs/presentation/dtos';
import { createAdminFaqTypeCommandHandler } from '@/modules/v1/faqs/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const createAdminFaqTypeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createAdminFaqTypeCommandHandler(req.body, req.lang);
    successResponseHandler<CreateAdminFaqTypeResponseDTO>(req, res, HttpStatus.CREATED, result, t(ResponseMessages, ResponseMessage.CREATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
