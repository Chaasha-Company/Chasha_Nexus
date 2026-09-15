import type { Request, Response, NextFunction } from 'express';
import type { CreateAdminFaqResponseDTO } from '@/modules/v1/faqs/presentation/dtos';
import { createAdminFaqCommandHandler } from '@/modules/v1/faqs/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const createAdminFaqController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createAdminFaqCommandHandler(req.body, req.lang);
    successResponseHandler<CreateAdminFaqResponseDTO>(req, res, HttpStatus.CREATED, result, t(ResponseMessages, ResponseMessage.CREATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
