import type { Request, Response, NextFunction } from 'express';
import type { GetListOptionAdminFaqResponseDTO } from '@/modules/v1/faqs/presentation/dtos';
import { getListOptionAdminFaqQueryHandler } from '@/modules/v1/faqs/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const getListOptionAdminFaqController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await getListOptionAdminFaqQueryHandler(req.lang);
    successResponseHandler<GetListOptionAdminFaqResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
