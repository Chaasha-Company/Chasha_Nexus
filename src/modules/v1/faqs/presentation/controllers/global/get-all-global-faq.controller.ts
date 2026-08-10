import type { GetAllGlobalFaqQueryRequestDTO, GetAllGlobalFaqResponseDTO } from '@/modules/v1/faqs/presentation/dtos';
import type { Request, Response, NextFunction } from 'express';
import { findAllFaqByTypeQueryHandler } from '@/modules/v1/faqs/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const getAllGlobalFaqController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await findAllFaqByTypeQueryHandler(req.query as unknown as GetAllGlobalFaqQueryRequestDTO);
    successResponseHandler<GetAllGlobalFaqResponseDTO[]>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
