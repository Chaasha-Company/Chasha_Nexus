import type { Request, Response, NextFunction } from 'express';
import type { GetAllPlatformAdminRoleResponseDTO, GetAllPlatformAdminRoleRequestQueryDTO } from '@/modules/v1/authorizations/presentation/dtos';
import { findAllPlatformAdminRoleQueryHandler } from '@/modules/v1/platform-admins/application';
import { paginationResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus } from '@/shared/v1/enums';

export const getAllPlatformAdminRoleController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = req.query as unknown as GetAllPlatformAdminRoleRequestQueryDTO;
    const result = await findAllPlatformAdminRoleQueryHandler({
      ...query,
    });

    paginationResponseHandler<GetAllPlatformAdminRoleResponseDTO>(req, res, HttpStatus.OK, result.data, { paginationLimit: +query.paginationLimit, paginationPage: +query.paginationPage, paginationTotalItems: result.count });
  } catch (error: unknown) {
    next(error);
  }
};
