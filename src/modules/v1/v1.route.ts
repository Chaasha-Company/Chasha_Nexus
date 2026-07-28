import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

import { swaggerUiConfig } from '@/config/open-api/swagger-ui';
import { openApiDocument } from '@/config/open-api';
import { EnvValueConfig } from '@/config/env';
import { adminRouter, businessRouter, globalRouter } from './routes';

const router = Router();

router.use('/admin', adminRouter);
router.use('/business', businessRouter);
router.use('/global', globalRouter);

if (EnvValueConfig.OPEN_API_ENABLED) {
  router.use(EnvValueConfig.OPEN_API_URL, swaggerUi.serve, swaggerUi.setup(openApiDocument('en'), swaggerUiConfig));
}

export { router as v1Router };
