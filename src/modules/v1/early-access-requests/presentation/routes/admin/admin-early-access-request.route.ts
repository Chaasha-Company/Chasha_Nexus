import { getListOptionEarlyAccessController } from '@/modules/v1/early-access-requests/presentation/controllers';
import { Router } from 'express';

const router = Router();

router.get('/list-option', getListOptionEarlyAccessController);

export { router as adminEarlyAccessRequestRouter };
