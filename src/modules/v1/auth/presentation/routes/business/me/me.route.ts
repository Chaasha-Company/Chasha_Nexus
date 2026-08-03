import { meBusinessController } from '@/modules/v1/auth/presentation/controllers';
import { Router } from 'express';

const router = Router();

router.get('/', meBusinessController);

export { router as businessMeRouter };
