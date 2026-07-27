import type { Language } from '@/infrastructure/translator-system/i18n';
import type { JsonObject } from 'swagger-ui-express';

import fs from 'fs';
import path from 'path';

import { EnvValueConfig } from '@/config/env';

const isProduction = EnvValueConfig.NODE_ENV === 'production';

export const openApiDocument = (lang: Language): JsonObject => JSON.parse(fs.readFileSync(path.join(process.cwd(), `${isProduction ? 'config/' : 'src/config/'}open-api/document/base/${lang}-base-config.config.json`), 'utf8'));
