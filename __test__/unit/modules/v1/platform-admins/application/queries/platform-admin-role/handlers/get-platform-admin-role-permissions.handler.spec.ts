import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { getPlatformAdminRolePermissionsQueryHandler } from '@/modules/v1/platform-admins/application/queries/platform-admin-role/handlers/get-platform-admin-role-permissions.handler';

import { findPlatformAdminRoleByIdRepository } from '@/modules/v1/platform-admins/infrastructure';
import { getAllPlatformAdminPermissionQueryHandler } from '@/modules/v1/authorizations/application';

jest.mock('@/modules/v1/platform-admins/infrastructure', () => ({
  findPlatformAdminRoleByIdRepository: jest.fn(),
}));

jest.mock('@/modules/v1/authorizations/application', () => ({
  getAllPlatformAdminPermissionQueryHandler: jest.fn(),
}));

const mockFindRole = jest.fn<(platformAdminRoleData: { platformAdminRoleId: string }) => Promise<PlatformAdminRolesModel | null>>();
(findPlatformAdminRoleByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindRole) => void }).mockReturnValue(mockFindRole);

const mockGetPermissions = jest.fn<(platformAdminPermissionData: { platformAdminPermissionRoleId: string }) => Promise<unknown>>();
(getAllPlatformAdminPermissionQueryHandler as unknown as { mockImplementation: (value: typeof mockGetPermissions) => void }).mockImplementation(mockGetPermissions);

describe('getPlatformAdminRolePermissionsQueryHandler', () => {
  beforeEach(() => {
    mockFindRole.mockReset();
    mockGetPermissions.mockReset();
  });

  it('delegates to the existing permission retrieval handler for an existing role', async () => {
    mockFindRole.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    const permissions = [{ platformAdminRolePermissionId: 'relation-uuid-1' }];
    mockGetPermissions.mockResolvedValue(permissions);

    const result = await getPlatformAdminRolePermissionsQueryHandler({ platformAdminRoleId: 'role-uuid-1' }, 'en');

    expect(mockFindRole).toHaveBeenCalledWith({ platformAdminRoleId: 'role-uuid-1' });
    expect(mockGetPermissions).toHaveBeenCalledWith({ platformAdminPermissionRoleId: 'role-uuid-1' });
    expect(result).toEqual(permissions);
  });

  it('returns an empty list for a role without assigned permissions', async () => {
    mockFindRole.mockResolvedValue({ platformAdminRoleId: 'role-uuid-2' } as PlatformAdminRolesModel);
    mockGetPermissions.mockResolvedValue([]);

    const result = await getPlatformAdminRolePermissionsQueryHandler({ platformAdminRoleId: 'role-uuid-2' }, 'en');

    expect(result).toEqual([]);
  });

  it('throws a not-found exception and skips permission retrieval when the role does not exist', async () => {
    mockFindRole.mockResolvedValue(null);

    await expect(getPlatformAdminRolePermissionsQueryHandler({ platformAdminRoleId: 'missing-role' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockGetPermissions).not.toHaveBeenCalled();
  });
});
