import { logoutPlatformAdminController } from '@/modules/v1/authentications/presentation/controllers';
import { Router } from 'express';

const router = Router();

router.post('/', logoutPlatformAdminController);

export { router as platformAdminLogoutRouter };
