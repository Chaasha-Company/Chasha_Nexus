import { Router, type Request, type Response, type NextFunction } from 'express';
import { forgotPasswordBusinessController } from '@/modules/v1/authentications/presentation/controllers';
import { ForgotPasswordBusinessValidation } from '@/modules/v1/authentications/presentation/validations';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(ForgotPasswordBusinessValidation(req.lang))(req, res, next), forgotPasswordBusinessController);

export { router as businessForgotPasswordRouter };
