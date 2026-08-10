import { Router } from 'express';
import { loginWithPhoneNumberBusinessController } from '@/modules/v1/authentications/presentation/controllers';
import { LoginWithPhoneNumberBusinessValidation } from '@/modules/v1/authentications/presentation/validations';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';
import { rateLimitMiddleware } from '@/shared/v1/middlewares/security';

const router = Router();

router.post('/with-phone', validateBodyMiddleware(LoginWithPhoneNumberBusinessValidation), rateLimitMiddleware({ keyGenerator: (req) => req.ip as string, max: 5, windowMs: 60 * 1_000 }), loginWithPhoneNumberBusinessController);

export { router as businessLoginRouter };
