import { Router, type Request, type Response, type NextFunction } from 'express';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';
import { CreateGlobalEarlyAccessRequestValidation } from '@/modules/v1/early-access-requests/presentation/validations';
import { createGlobalEarlyAccessRequestController } from '@/modules/v1/early-access-requests/presentation/controllers';

const router = Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(CreateGlobalEarlyAccessRequestValidation(req.lang))(req, res, next), createGlobalEarlyAccessRequestController);

export { router as globalEarlyAccessRequestRouter };
