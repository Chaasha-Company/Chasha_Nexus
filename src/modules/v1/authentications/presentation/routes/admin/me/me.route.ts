import { mePlatformAdminController } from '@/modules/v1/authentications/presentation/controllers';
import { Router } from 'express';

const router = Router();

router.get('/', mePlatformAdminController);

export { router as platformAdminMeRouter };
