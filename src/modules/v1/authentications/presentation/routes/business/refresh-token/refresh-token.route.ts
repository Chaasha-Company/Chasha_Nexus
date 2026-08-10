import { Router } from 'express';
import { refreshTokenBusinessController } from '@/modules/v1/authentications/presentation/controllers';
import { RefreshTokenBusinessValidation } from '@/modules/v1/authentications/presentation/validations';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';

const router = Router();

router.post('/', validateBodyMiddleware(RefreshTokenBusinessValidation), refreshTokenBusinessController);

export { router as businessRefreshTokenRouter };
