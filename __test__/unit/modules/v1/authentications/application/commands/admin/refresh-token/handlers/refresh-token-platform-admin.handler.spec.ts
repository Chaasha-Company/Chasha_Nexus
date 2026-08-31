import type { PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';
import type { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { refreshTokenPlatformAdminCommandHandler } from '@/modules/v1/authentications/application/commands/admin/refresh-token/handlers/refresh-token-platform-admin.handler';

import { findPlatformAdminSessionByIdRepository } from '@/modules/v1/platform-admin-sessions';
import { updatePlatformAdminSessionRepository } from '@/modules/v1/platform-admin-sessions/infrastructure';
import { createAccessTokenProvider, createRefreshTokenProvider, hashPasswordProvider, passwordCheckerProvider, verifyRefreshTokenProvider } from '@/modules/v1/authentications/infrastructure';

jest.mock('@/modules/v1/platform-admin-sessions', () => ({
  findPlatformAdminSessionByIdRepository: jest.fn(),
}));

jest.mock('@/modules/v1/platform-admin-sessions/infrastructure', () => ({
  updatePlatformAdminSessionRepository: jest.fn(),
}));

jest.mock('@/modules/v1/authentications/infrastructure', () => ({
  createAccessTokenProvider: jest.fn(),
  createRefreshTokenProvider: jest.fn(),
  hashPasswordProvider: jest.fn(),
  passwordCheckerProvider: jest.fn(),
  verifyRefreshTokenProvider: jest.fn(),
}));

jest.mock('@/config/env', () => ({
  EnvValueConfig: {
    JWT_REFRESH_TOKEN_EXPIRES_AT: 604800000,
    JWT_ACCESS_TOKEN_EXPIRES_AT: 900000,
    JWT_REFRESH_TOKEN_SECRET_KEY: 'refresh-secret',
    JWT_ACCESS_TOKEN_SECRET_KEY: 'access-secret',
  },
}));

const mockVerify = jest.fn<() => PlatformAdminAuthTokenPayload | string | null>();
(verifyRefreshTokenProvider as unknown as { mockReturnValue: (value: typeof mockVerify) => void }).mockReturnValue(mockVerify);

const mockFindSession = jest.fn<(data: { platformAdminSessionId: string }) => Promise<PlatformAdminSessionsModel | null>>();
(findPlatformAdminSessionByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindSession) => void }).mockReturnValue(mockFindSession);

const mockPasswordChecker = jest.fn<(plain: string, hash: string) => Promise<boolean>>();
(passwordCheckerProvider as unknown as { mockReturnValue: (value: typeof mockPasswordChecker) => void }).mockReturnValue(mockPasswordChecker);

const mockCreateAccess = jest.fn<(payload: PlatformAdminAuthTokenPayload) => string>();
(createAccessTokenProvider as unknown as { mockReturnValue: (value: typeof mockCreateAccess) => void }).mockReturnValue(mockCreateAccess);

const mockCreateRefresh = jest.fn<(payload: PlatformAdminAuthTokenPayload) => string>();
(createRefreshTokenProvider as unknown as { mockReturnValue: (value: typeof mockCreateRefresh) => void }).mockReturnValue(mockCreateRefresh);

const mockHashPassword = jest.fn<(value: string) => Promise<string>>();
(hashPasswordProvider as unknown as { mockReturnValue: (value: typeof mockHashPassword) => void }).mockReturnValue(mockHashPassword);

const mockUpdateSession = jest.fn<(data: Record<string, unknown>) => Promise<PlatformAdminSessionsModel | null>>();
(updatePlatformAdminSessionRepository as unknown as { mockReturnValue: (value: typeof mockUpdateSession) => void }).mockReturnValue(mockUpdateSession);

const payload: PlatformAdminAuthTokenPayload = {
  auth_token_id: 'admin-uuid-1',
  auth_token_session_id: 'session-uuid-1',
  auth_token_role_id: 'role-uuid-1',
  auth_token_type: 'platform_admin',
};

const activeSession = {
  platformAdminSessionId: 'session-uuid-1',
  platformAdminSessionExpiresAt: new Date(Date.now() + 604800000),
  platformAdminSessionRevokedAt: null,
  platformAdminSessionRefreshToken: 'hashed-refresh-token',
} as PlatformAdminSessionsModel;

const expiredSession = {
  ...activeSession,
  platformAdminSessionExpiresAt: new Date(Date.now() - 1000),
} as PlatformAdminSessionsModel;

const revokedSession = {
  ...activeSession,
  platformAdminSessionRevokedAt: new Date(),
} as PlatformAdminSessionsModel;

describe('refreshTokenPlatformAdminCommandHandler', () => {
  beforeEach(() => {
    mockVerify.mockReset();
    mockFindSession.mockReset();
    mockPasswordChecker.mockReset();
    mockCreateAccess.mockReset();
    mockCreateRefresh.mockReset();
    mockHashPassword.mockReset();
    mockUpdateSession.mockReset();

    mockVerify.mockReturnValue(payload);
    mockFindSession.mockResolvedValue(activeSession);
    mockPasswordChecker.mockResolvedValue(true);
    mockCreateAccess.mockReturnValue('new-access-token');
    mockCreateRefresh.mockReturnValue('new-refresh-token');
    mockHashPassword.mockResolvedValue('new-hashed-refresh-token');
    mockUpdateSession.mockResolvedValue(activeSession);
  });

  it('rotates both tokens and refreshes the session when the refresh token is valid', async () => {
    const result = await refreshTokenPlatformAdminCommandHandler({ refreshTokenPlatformAdmin: 'token' }, 'en');

    expect(mockVerify).toHaveBeenCalledWith('token');
    expect(mockFindSession).toHaveBeenCalledWith({ platformAdminSessionId: 'session-uuid-1' });
    expect(mockPasswordChecker).toHaveBeenCalledWith('token', 'hashed-refresh-token');
    expect(mockUpdateSession).toHaveBeenCalledTimes(1);
    expect(mockUpdateSession.mock.calls[0][0]).toMatchObject({
      platformAdminSessionId: 'session-uuid-1',
      platformAdminSessionRefreshToken: 'new-hashed-refresh-token',
    });
    expect(result).toEqual({ newPlatformAdminAccessToken: 'new-access-token', newPlatformAdminRefreshToken: 'new-refresh-token' });
  });

  it('rejects when the token is not verifiable', async () => {
    mockVerify.mockReturnValue(null);

    await expect(refreshTokenPlatformAdminCommandHandler({ refreshTokenPlatformAdmin: 'bad-token' }, 'en')).rejects.toMatchObject({
      statusCode: 401,
    });

    expect(mockFindSession).not.toHaveBeenCalled();
  });

  it('rejects a token whose type is not platform_admin', async () => {
    mockVerify.mockReturnValue({ ...payload, auth_token_type: 'business_employee' } as unknown as PlatformAdminAuthTokenPayload);

    await expect(refreshTokenPlatformAdminCommandHandler({ refreshTokenPlatformAdmin: 'token' }, 'en')).rejects.toMatchObject({
      statusCode: 401,
    });

    expect(mockFindSession).not.toHaveBeenCalled();
  });

  it('rejects when no matching session exists for the token session id', async () => {
    mockFindSession.mockResolvedValue(null);

    await expect(refreshTokenPlatformAdminCommandHandler({ refreshTokenPlatformAdmin: 'token' }, 'en')).rejects.toMatchObject({
      statusCode: 401,
    });

    expect(mockPasswordChecker).not.toHaveBeenCalled();
  });

  it('rejects an expired session', async () => {
    mockFindSession.mockResolvedValue(expiredSession);

    await expect(refreshTokenPlatformAdminCommandHandler({ refreshTokenPlatformAdmin: 'token' }, 'en')).rejects.toMatchObject({
      statusCode: 401,
    });
  });

  it('rejects a revoked session', async () => {
    mockFindSession.mockResolvedValue(revokedSession);

    await expect(refreshTokenPlatformAdminCommandHandler({ refreshTokenPlatformAdmin: 'token' }, 'en')).rejects.toMatchObject({
      statusCode: 401,
    });
  });

  it('rejects when the presented refresh token does not match the stored hash', async () => {
    mockPasswordChecker.mockResolvedValue(false);

    await expect(refreshTokenPlatformAdminCommandHandler({ refreshTokenPlatformAdmin: 'token' }, 'en')).rejects.toMatchObject({
      statusCode: 401,
    });

    expect(mockUpdateSession).not.toHaveBeenCalled();
  });
});
