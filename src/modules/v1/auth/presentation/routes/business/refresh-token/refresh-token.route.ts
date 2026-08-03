import { Router, type NextFunction, type Request, type Response } from 'express';
import { refreshTokenBusinessController } from '@/modules/v1/auth/presentation/controllers';
import { RefreshTokenBusinessValidation } from '@/modules/v1/auth/presentation/validations';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(RefreshTokenBusinessValidation(req.lang))(req, res, next), refreshTokenBusinessController);

export { router as businessRefreshTokenRouter };
