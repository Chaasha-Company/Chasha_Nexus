import { logoutBusinessController } from '@/modules/v1/authentications/presentation/controllers';
import { Router } from 'express';

const router = Router();

router.post('/', logoutBusinessController);

export { router as businessLogoutRouter };
