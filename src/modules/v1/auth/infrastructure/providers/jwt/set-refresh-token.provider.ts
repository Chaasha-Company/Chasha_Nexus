import type { Response } from 'express';
import type { SetRefreshTokenProviderContract } from '@/modules/v1/auth/domain';
import { EnvValueConfig } from '@/config/env';

export const setRefreshTokenProvider =
  (): SetRefreshTokenProviderContract =>
  (res: Response, token: string, isLocal: boolean): void => {
    const isProduction = EnvValueConfig.NODE_ENV === 'production';

    res.cookie('Refresh_Token-V1', token, {
      httpOnly: true,
      secure: isProduction && !isLocal,
      sameSite: isLocal ? 'lax' : 'none',
      maxAge: EnvValueConfig.JWT_REFRESH_TOKEN_EXPIRES_AT,
      domain: isLocal ? undefined : '.mehkam.ir',
    });
  };
