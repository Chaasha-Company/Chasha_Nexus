import { mePlatformAdminController } from '@/modules/v1/auth/presentation/controllers';
import { Router } from 'express';

const router = Router();

router.get('/', mePlatformAdminController);

export { router as platformAdminMeRouter };
