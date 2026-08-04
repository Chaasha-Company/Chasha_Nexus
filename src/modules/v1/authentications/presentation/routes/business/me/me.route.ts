import { meBusinessController } from '@/modules/v1/authentications/presentation/controllers';
import { Router } from 'express';

const router = Router();

router.get('/', meBusinessController);

export { router as businessMeRouter };
