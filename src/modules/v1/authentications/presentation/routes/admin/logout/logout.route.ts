import { logoutPlatformAdminController } from '@/modules/v1/authentications/presentation/controllers';
import { Router } from 'express';

const router = Router();

router.post('/logout', logoutPlatformAdminController);

export { router as platformAdminLogoutRouter };
