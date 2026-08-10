import { getAllGlobalFaqController } from '@/modules/v1/faqs/presentation/controllers';
import { GetAllGlobalFaqQueryValidation } from '@/modules/v1/faqs/presentation/validations';
import { validateQueryMiddleware } from '@/shared/v1/middlewares/validation';
import { Router } from 'express';

const router = Router();

router.get('/get-all', validateQueryMiddleware(GetAllGlobalFaqQueryValidation), getAllGlobalFaqController);

export { router as globalFaqRouter };
