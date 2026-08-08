import { Router, type Request, type Response, type NextFunction } from 'express';
import { forgotPasswordBusinessController, forgotPasswordVerifyBusinessController } from '@/modules/v1/authentications/presentation/controllers';
import { ForgotPasswordBusinessValidation, ForgotPasswordVerifyBusinessValidation } from '@/modules/v1/authentications/presentation/validations';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(ForgotPasswordBusinessValidation(req.lang))(req, res, next), forgotPasswordBusinessController);
router.post('/verify', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(ForgotPasswordVerifyBusinessValidation(req.lang))(req, res, next), forgotPasswordVerifyBusinessController);

export { router as businessForgotPasswordRouter };
