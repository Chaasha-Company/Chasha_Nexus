import type { Request, Response, NextFunction } from 'express';
import type { CreateGlobalEarlyAccessRequestResponseDTO } from '@/modules/v1/early-access-requests/presentation/dtos';
import { createGlobalEarlyAccessRequestCommandHandler } from '@/modules/v1/early-access-requests/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const createGlobalEarlyAccessRequestController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await createGlobalEarlyAccessRequestCommandHandler(req.body, req.lang);
    successResponseHandler<CreateGlobalEarlyAccessRequestResponseDTO>(req, res, HttpStatus.CREATED, result, t(ResponseMessages, ResponseMessage.CREATED_SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
