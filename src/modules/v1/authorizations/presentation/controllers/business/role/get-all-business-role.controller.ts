import type { Request, Response, NextFunction } from 'express';
import type { GetAllBusinessRoleResponseDTO, GetAllBusinessRoleQueryDTO } from '@/modules/v1/authorizations/presentation/dtos';
import type { BusinessEmployeeAuthTokenPayload } from '@/shared/v1/types/auth';
import { findAllBusinessRoleQueryHandler } from '@/modules/v1/businesses/application';
import { paginationResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus } from '@/shared/v1/enums';

export const getAllBusinessRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = req.query as unknown as GetAllBusinessRoleQueryDTO;
    const paginationPage = Number(query.paginationPage as string);
    const paginationLimit = Number(query.paginationLimit as string);

    const result = await findAllBusinessRoleQueryHandler({
      businessRoleBusinessId: (req.user as BusinessEmployeeAuthTokenPayload | undefined)?.auth_token_business_id as string,
      businessRoleSearchQuery: query.businessRoleSearch as string | undefined,
      businessRoleIsActiveQuery: query.businessRoleIsActive === undefined ? undefined : query.businessRoleIsActive === 'true',
      businessRolePaginationSkip: (paginationPage - 1) * paginationLimit,
      businessRolePaginationTake: paginationLimit,
    });

    paginationResponseHandler<GetAllBusinessRoleResponseDTO>(req, res, HttpStatus.OK, result.data, {
      paginationLimit,
      paginationPage,
      paginationTotalItems: result.count,
    });
  } catch (error: unknown) {
    next(error);
  }
};
