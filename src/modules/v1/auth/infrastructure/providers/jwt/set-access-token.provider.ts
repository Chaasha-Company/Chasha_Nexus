import type { Response } from 'express';
import type { SetAccessTokenProviderContract } from '@/modules/v1/auth/domain';
import { EnvValueConfig } from '@/config/env';

export const setAccessTokenProvider =
  (): SetAccessTokenProviderContract =>
  (res: Response, token: string, isLocal: boolean): void => {
    const isProduction = EnvValueConfig.NODE_ENV === 'production';

    res.cookie('Access_Token-V1', token, {
      httpOnly: true,
      secure: isProduction && !isLocal,
      sameSite: isLocal ? 'lax' : 'none',
      maxAge: EnvValueConfig.JWT_ACCESS_TOKEN_EXPIRES_AT,
      domain: isLocal ? undefined : '.karaflow.com',
    });
  };
