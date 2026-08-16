import type { Request, Response, NextFunction } from 'express';
import type { GetAllEarlyAccessRequestRequestQueryDTO, GetAllEarlyAccessRequestResponseDTO } from '@/modules/v1/early-access-requests/presentation/dtos';
import { findAllEarlyAccessRequestQueryHandler } from '@/modules/v1/early-access-requests/application';
import { paginationResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus } from '@/shared/v1/enums';

export const getAllEarlyAccessRequestContoller = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = req.query as unknown as GetAllEarlyAccessRequestRequestQueryDTO;
    const result = await findAllEarlyAccessRequestQueryHandler({
      ...query,
    });

    paginationResponseHandler<GetAllEarlyAccessRequestResponseDTO>(req, res, HttpStatus.OK, result.data, { paginationLimit: +query.paginationLimit, paginationPage: +query.paginationPage, paginationTotalItems: result.count });
  } catch (error: unknown) {
    next(error);
  }
};
