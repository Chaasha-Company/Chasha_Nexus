import { Router } from 'express';
import { loginResendOtpPlatformAdminController, loginVeirfyPlatformAdminController, loginWithPhoneNumberPlatformAdminController } from '@/modules/v1/authentications/presentation/controllers';
import { LoginResendOtpPlatformAdminValidation, LoginVerifyPlatformAdminValidation, LoginWithPhoneNumberPlatformAdminValidation } from '@/modules/v1/authentications/presentation/validations';
import { validateBodyMiddleware, rateLimitMiddleware } from '@/shared/v1/middlewares';

const router = Router();

router.post('/with-phone', validateBodyMiddleware(LoginWithPhoneNumberPlatformAdminValidation), rateLimitMiddleware({ keyGenerator: (req) => req.ip as string, max: 5, windowMs: 60 * 1_000 }), loginWithPhoneNumberPlatformAdminController);
router.post('/with-phone/verify', validateBodyMiddleware(LoginVerifyPlatformAdminValidation), rateLimitMiddleware({ keyGenerator: (req) => `${req.body.loginVerifySessionId}:${req.ip}`, max: 2, windowMs: 60 * 1_000 }), loginVeirfyPlatformAdminController);

router.post('/with-phone/resend-otp', validateBodyMiddleware(LoginResendOtpPlatformAdminValidation), loginResendOtpPlatformAdminController);

export { router as platformAdminLoginRouter };
