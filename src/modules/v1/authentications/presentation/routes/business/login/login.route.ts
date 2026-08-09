import { Router, type NextFunction, type Request, type Response } from 'express';
import { loginWithPhoneNumberBusinessController } from '@/modules/v1/authentications/presentation/controllers';
import { LoginWithPhoneNumberBusinessValidation } from '@/modules/v1/authentications/presentation/validations';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';

const router = Router();

router.post('/with-phone', (req: Request, res: Response, next: NextFunction) => validateBodyMiddleware(LoginWithPhoneNumberBusinessValidation(req.lang))(req, res, next), loginWithPhoneNumberBusinessController);

export { router as businessLoginRouter };
