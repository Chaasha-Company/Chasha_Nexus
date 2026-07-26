import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

import { swaggerUiConfig } from '@/config/open-api/swagger-ui';
import { openApiDocument } from '@/config/open-api';
import { adminRouter } from '@/modules/v1/admin';
import { globalRouter } from '@/modules/v1/global';
import { userRouter } from '@/modules/v1/user';
import { EnvValueConfig } from '@/config/env';

const router = Router();

router.use('/global', globalRouter);

router.use('/user', userRouter);

router.use('/admin', adminRouter);

if (EnvValueConfig.OPEN_API_ENABLED) {
  router.use(
    EnvValueConfig.OPEN_API_URL,
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument('en'), swaggerUiConfig),
  );
}

export { router as v1Router };
