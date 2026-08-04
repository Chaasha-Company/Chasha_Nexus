import type { Request, Response, NextFunction } from 'express';
import type { RefreshTokenBusinessResponseDTO } from '@/modules/v1/authentications/presentation/dtos';
import { refreshTokenBusinessCommandHandler } from '@/modules/v1/authentications/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const refreshTokenBusinessController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await refreshTokenBusinessCommandHandler(req.body, req.lang);
    successResponseHandler<RefreshTokenBusinessResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
