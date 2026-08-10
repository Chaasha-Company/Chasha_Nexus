import { Router } from 'express';
import { validateBodyMiddleware } from '@/shared/v1/middlewares/validation';
import { CreateGlobalEarlyAccessRequestValidation } from '@/modules/v1/early-access-requests/presentation/validations';
import { createGlobalEarlyAccessRequestController } from '@/modules/v1/early-access-requests/presentation/controllers';

const router = Router();

router.post('/create', validateBodyMiddleware(CreateGlobalEarlyAccessRequestValidation), createGlobalEarlyAccessRequestController);

export { router as globalEarlyAccessRequestRouter };
