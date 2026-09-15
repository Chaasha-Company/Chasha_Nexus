import { getAllBusinessTypeController } from '@/modules/v1/lockups/presentation/controllers';
import { Router } from 'express';

const router = Router();

router.get('/get-all', getAllBusinessTypeController);

export { router as businessTypeRouter };
