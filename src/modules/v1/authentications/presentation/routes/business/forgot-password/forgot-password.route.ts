import { Router } from 'express';
import { forgotPasswordBusinessController, forgotPasswordVerifyBusinessController } from '@/modules/v1/authentications/presentation/controllers';
import { ForgotPasswordBusinessValidation, ForgotPasswordVerifyBusinessValidation } from '@/modules/v1/authentications/presentation/validations';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';

const router = Router();

router.post('/', validateBodyMiddleware(ForgotPasswordBusinessValidation), forgotPasswordBusinessController);
router.post('/verify', validateBodyMiddleware(ForgotPasswordVerifyBusinessValidation), forgotPasswordVerifyBusinessController);

export { router as businessForgotPasswordRouter };
