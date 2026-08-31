import type { LoginWithPhoneNumberPlatformAdminSession } from '@/infrastructure/cache-system/node-cache';
import type { PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';
import type { PlatformAdminSessionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import type { PlatformAdminsModel } from '@/shared/v1/database/schema/platform_admins';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { loginVerifyPlatformAdminCommandHandler } from '@/modules/v1/authentications/application/commands/admin/login/handlers/login-verify-platform-admin.handler';

import { deleteCacheHelper, getCacheHelper } from '@/infrastructure/cache-system/node-cache';
import { findPlatformAdminByPhoneNumberRepository } from '@/modules/v1/platform-admins';
import { createPlatformAdminSessionRepository } from '@/modules/v1/platform-admin-sessions';
import { createAccessTokenProvider, createRefreshTokenProvider, hashPasswordProvider } from '@/modules/v1/authentications/infrastructure';

jest.mock('@/infrastructure/cache-system/node-cache', () => ({
  getCacheHelper: jest.fn(),
  deleteCacheHelper: jest.fn(),
}));

jest.mock('@/modules/v1/platform-admins', () => ({
  findPlatformAdminByPhoneNumberRepository: jest.fn(),
}));

jest.mock('@/modules/v1/platform-admin-sessions', () => ({
  createPlatformAdminSessionRepository: jest.fn(),
}));

jest.mock('@/modules/v1/authentications/infrastructure', () => ({
  createAccessTokenProvider: jest.fn(),
  createRefreshTokenProvider: jest.fn(),
  hashPasswordProvider: jest.fn(),
}));

jest.mock('@/config/env', () => ({
  EnvValueConfig: {
    JWT_REFRESH_TOKEN_EXPIRES_AT: 604800000,
    JWT_ACCESS_TOKEN_EXPIRES_AT: 900000,
    JWT_REFRESH_TOKEN_SECRET_KEY: 'refresh-secret',
    JWT_ACCESS_TOKEN_SECRET_KEY: 'access-secret',
  },
}));

const mockGetCache = jest.fn<(data: { cacheName: string }) => LoginWithPhoneNumberPlatformAdminSession | undefined>();
(getCacheHelper as unknown as { mockReturnValue: (value: typeof mockGetCache) => void }).mockReturnValue(mockGetCache);

const mockDeleteCache = jest.fn<(data: { cacheName: string }) => boolean>();
(deleteCacheHelper as unknown as { mockReturnValue: (value: typeof mockDeleteCache) => void }).mockReturnValue(mockDeleteCache);

const mockFindPlatformAdmin = jest.fn<(data: { platformAdminPhoneNumber: string }) => Promise<PlatformAdminsModel | null>>();
(findPlatformAdminByPhoneNumberRepository as unknown as { mockReturnValue: (value: typeof mockFindPlatformAdmin) => void }).mockReturnValue(mockFindPlatformAdmin);

const mockCreateSession = jest.fn<(data: Record<string, unknown>) => Promise<PlatformAdminSessionsModel | null>>();
(createPlatformAdminSessionRepository as unknown as { mockReturnValue: (value: typeof mockCreateSession) => void }).mockReturnValue(mockCreateSession);

const mockCreateAccessToken = jest.fn<(payload: PlatformAdminAuthTokenPayload) => string>();
(createAccessTokenProvider as unknown as { mockReturnValue: (value: typeof mockCreateAccessToken) => void }).mockReturnValue(mockCreateAccessToken);

const mockCreateRefreshToken = jest.fn<(payload: PlatformAdminAuthTokenPayload) => string>();
(createRefreshTokenProvider as unknown as { mockReturnValue: (value: typeof mockCreateRefreshToken) => void }).mockReturnValue(mockCreateRefreshToken);

const mockHashPassword = jest.fn<(value: string) => Promise<string>>();
(hashPasswordProvider as unknown as { mockReturnValue: (value: typeof mockHashPassword) => void }).mockReturnValue(mockHashPassword);

const buildCommand = (overrides: Partial<{ loginVerifySessionId: string; loginVerifyOtp: string }> = {}) => ({
  loginVerifySessionId: 'session-uuid-1',
  loginVerifyOtp: '123456',
  loginVerifyPhoneNumber: '+989120000000',
  loginVerifyIpAddress: '127.0.0.1',
  loginVerifyUserAgent: 'jest',
  ...overrides,
});

const buildSession = (otp: number): LoginWithPhoneNumberPlatformAdminSession => ({
  platformAdminLoginWithPhoneNumberOtp: otp,
  platformAdminLoginWithPhoneNumberOtpExpiresAt: 120,
  platformAdminLoginWithPhoneNumberOtpCreatedAt: new Date(),
  platformAdminLoginWithPhoneNumberSessionId: 'session-uuid-1',
});

const platformAdminRow = {
  platformAdminId: 'admin-uuid-1',
  platformAdminRoleId: 'role-uuid-1',
} as PlatformAdminsModel;

describe('loginVerifyPlatformAdminCommandHandler', () => {
  beforeEach(() => {
    mockGetCache.mockReset();
    mockDeleteCache.mockReset();
    mockFindPlatformAdmin.mockReset();
    mockCreateSession.mockReset();
    mockCreateAccessToken.mockReset();
    mockCreateRefreshToken.mockReset();
    mockHashPassword.mockReset();

    mockCreateAccessToken.mockReturnValue('access-token');
    mockCreateRefreshToken.mockReturnValue('refresh-token');
    mockHashPassword.mockResolvedValue('hashed-refresh-token');
  });

  it('verifies against the OTP stored in the session, not a hardcoded value', async () => {
    mockGetCache.mockReturnValue(buildSession(654321));
    mockFindPlatformAdmin.mockResolvedValue(platformAdminRow);
    mockCreateSession.mockResolvedValue(null);

    const result = await loginVerifyPlatformAdminCommandHandler(buildCommand({ loginVerifyOtp: '654321' }), 'en');

    expect(mockGetCache).toHaveBeenCalled();
    expect(result.loginVerifyAccessToken).toBe('access-token');
    expect(result.loginVerifyRefreshToken).toBe('refresh-token');
  });

  it('rejects the request when the submitted OTP does not match the stored OTP', async () => {
    mockGetCache.mockReturnValue(buildSession(654321));
    mockFindPlatformAdmin.mockResolvedValue(platformAdminRow);

    await expect(loginVerifyPlatformAdminCommandHandler(buildCommand({ loginVerifyOtp: '111111' }), 'en')).rejects.toMatchObject({
      statusCode: 400,
    });

    expect(mockCreateAccessToken).not.toHaveBeenCalled();
    expect(mockCreateSession).not.toHaveBeenCalled();
  });

  it('does not accept the well-known literal 123456 when the stored OTP differs', async () => {
    mockGetCache.mockReturnValue(buildSession(999999));

    await expect(loginVerifyPlatformAdminCommandHandler(buildCommand({ loginVerifyOtp: '123456' }), 'en')).rejects.toMatchObject({
      statusCode: 400,
    });

    expect(mockCreateSession).not.toHaveBeenCalled();
  });

  it('creates a hashed session and returns fresh tokens on a successful verification', async () => {
    mockGetCache.mockReturnValue(buildSession(123456));
    mockFindPlatformAdmin.mockResolvedValue(platformAdminRow);
    mockCreateSession.mockResolvedValue(null);

    const result = await loginVerifyPlatformAdminCommandHandler(buildCommand(), 'en');

    expect(mockCreateSession).toHaveBeenCalledTimes(1);
    expect(mockCreateSession.mock.calls[0][0]).toMatchObject({
      platformAdminSessionUserId: 'admin-uuid-1',
      platformAdminSessionRefreshToken: 'hashed-refresh-token',
      platformAdminSessionIpAddress: '127.0.0.1',
      platformAdminSessionUserAgent: 'jest',
    });
    expect(mockDeleteCache).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ loginVerifyAccessToken: 'access-token', loginVerifyRefreshToken: 'refresh-token' });
  });

  it('throws a not-found exception when the cached login session is missing', async () => {
    mockGetCache.mockReturnValue(undefined);

    await expect(loginVerifyPlatformAdminCommandHandler(buildCommand(), 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockFindPlatformAdmin).not.toHaveBeenCalled();
  });

  it('throws a not-found exception when the session id does not match the submitted one', async () => {
    mockGetCache.mockReturnValue(buildSession(123456));

    await expect(loginVerifyPlatformAdminCommandHandler(buildCommand({ loginVerifySessionId: 'wrong-session' }), 'en')).rejects.toMatchObject({
      statusCode: 404,
    });

    expect(mockFindPlatformAdmin).not.toHaveBeenCalled();
  });

  it('throws a not-found exception when no platform admin exists for the phone number', async () => {
    mockGetCache.mockReturnValue(buildSession(123456));
    mockFindPlatformAdmin.mockResolvedValue(null);

    await expect(loginVerifyPlatformAdminCommandHandler(buildCommand(), 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockCreateSession).not.toHaveBeenCalled();
  });
});
