import { businessLoginRouter } from './login';
import { Router } from 'express';

const router = Router();

router.use('/login', businessLoginRouter);

export { router as businessAuthRouter };
