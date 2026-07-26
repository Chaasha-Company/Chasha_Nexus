import type { NodeEnv } from '@/shared/v1/types/config/env';

import dotenv from 'dotenv';
import path from 'path';

export const envLoaderBootstrapConfig = (): void => {
  const _env: NodeEnv = (process.env.NODE_ENV as NodeEnv) ?? 'production';

  dotenv.config({
    path: path.resolve(process.cwd(), `.env.${_env}`),
  });
};

envLoaderBootstrapConfig();
