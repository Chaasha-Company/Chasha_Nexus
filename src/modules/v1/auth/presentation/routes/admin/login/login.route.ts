import { type NextFunction, type Request, type Response, Router } from 'express';
import { loginResendOtpPlatformAdminController, loginVeirfyPlatformAdminController, loginWithPhoneNumberPlatformAdminController } from '@/modules/v1/auth/presentation/controllers';
import { LoginResendOtpPlatformAdminValidation, LoginVerifyPlatformAdminValidation, LoginWithPhoneNumberPlatformAdminValidation } from '@/modules/v1/auth/presentation/validations';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';

const router = Router();

router.post('/with-phone', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(LoginWithPhoneNumberPlatformAdminValidation(req.lang))(req, res, next), loginWithPhoneNumberPlatformAdminController);
router.post('/with-phone/verify', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(LoginVerifyPlatformAdminValidation(req.lang))(req, res, next), loginVeirfyPlatformAdminController);

router.post('/with-phone/resend-otp', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(LoginResendOtpPlatformAdminValidation(req.lang))(req, res, next), loginResendOtpPlatformAdminController);

export { router as adminLoginRouter };
