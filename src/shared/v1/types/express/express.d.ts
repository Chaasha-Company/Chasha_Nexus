import 'express';
import type { Language } from '@/infrastructure/translator-system/i18n';
import type { BusinessEmployeeAuthTokenPayload, PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth';

declare module 'express-serve-static-core' {
  interface Request {
    request_id: string;
    lang: Language;
  }
  interface Request {
    user?: PlatformAdminAuthTokenPayload | BusinessEmployeeAuthTokenPayload;
  }
}
