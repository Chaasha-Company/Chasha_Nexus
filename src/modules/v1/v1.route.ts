import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

import { swaggerUiConfig } from '@/config/open-api/swagger-ui';
import { openApiDocument } from '@/config/open-api';
import { EnvValueConfig } from '@/config/env';

const router = Router();

if (EnvValueConfig.OPEN_API_ENABLED) {
  router.use(EnvValueConfig.OPEN_API_URL, swaggerUi.serve, swaggerUi.setup(openApiDocument('en'), swaggerUiConfig));
}

export { router as v1Router };
