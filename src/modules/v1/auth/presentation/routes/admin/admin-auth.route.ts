import { type NextFunction, type Request, type Response, Router } from 'express';
import { loginWithPhoneNumberPlatformAdminController } from '@/modules/v1/auth/presentation/controllers';
import { LoginWithPhoneNumberPlatformAdminValidation } from '@/modules/v1/auth/presentation/validations';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';

const router = Router();

router.post('/login/with-phone', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(LoginWithPhoneNumberPlatformAdminValidation(req.lang))(req, res, next), loginWithPhoneNumberPlatformAdminController);

export { router as adminAuthRouter };
