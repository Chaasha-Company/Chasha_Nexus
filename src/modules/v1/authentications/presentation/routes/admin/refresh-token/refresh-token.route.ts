import { Router } from 'express';
import { refreshTokenPlatformAdminController } from '@/modules/v1/authentications/presentation/controllers';

const router = Router();

router.post('/', refreshTokenPlatformAdminController);

export { router as platformAdminRefreshTokenRouter };
