import type { GetAllGlobalFaqQueryRequestDTO, GetAllGlobalFaqResponseDTO } from '@/modules/v1/faqs/presentation/dtos';
import type { Request, Response, NextFunction } from 'express';
import { findAllFaqByTypeQueryHandler } from '@/modules/v1/faqs/application';
import { HttpStatus } from '@/shared/v1/enums';
import { paginationResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const getAllGlobalFaqController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = req.query as unknown as GetAllGlobalFaqQueryRequestDTO;
    const result = await findAllFaqByTypeQueryHandler(query, req.lang);

    paginationResponseHandler<GetAllGlobalFaqResponseDTO>(req, res, HttpStatus.OK, result.data, {
      paginationLimit: Number(query.paginationLimit),
      paginationPage: Number(query.paginationPage),
      paginationTotalItems: result.count,
    });
  } catch (error: unknown) {
    next(error);
  }
};
