import type { GetAllBusinessTypeResponseDTO } from '@/modules/v1/lockup/presentation/dtos';
import type { Request, Response, NextFunction } from 'express';
import { getAllBusinessTypeQueryHandler } from '@/modules/v1/lockup/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const getAllBusinessTypeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await getAllBusinessTypeQueryHandler();

    successResponseHandler<GetAllBusinessTypeResponseDTO[]>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
