import type { PlatformAdminRolePermissionsModel, PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import type { PermissionsModel } from '@/shared/v1/database/schema/permissions';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { assignPlatformAdminRolePermissionCommandHandler } from '@/modules/v1/platform-admins/application/commands/platform-admin-role/handlers/assign-platform-admin-role-permission.handler';

import { createPlatformAdminRolePermissionRepository, findPlatformAdminRoleByIdRepository, findPlatformAdminRolePermissionRepository } from '@/modules/v1/platform-admins/infrastructure';
import { findPlatformAdminPermissionByIdRepository } from '@/modules/v1/authorizations/infrastructure';

jest.mock('@/modules/v1/platform-admins/infrastructure', () => ({
  findPlatformAdminRoleByIdRepository: jest.fn(),
  findPlatformAdminRolePermissionRepository: jest.fn(),
  createPlatformAdminRolePermissionRepository: jest.fn(),
}));

jest.mock('@/modules/v1/authorizations/infrastructure', () => ({
  findPlatformAdminPermissionByIdRepository: jest.fn(),
}));

const mockFindRole = jest.fn<(platformAdminRoleData: { platformAdminRoleId: string }) => Promise<PlatformAdminRolesModel | null>>();
(findPlatformAdminRoleByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindRole) => void }).mockReturnValue(mockFindRole);

const mockFindPermission = jest.fn<(platformAdminPermissionData: { platformAdminPermissionId: string }) => Promise<PermissionsModel | null>>();
(findPlatformAdminPermissionByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindPermission) => void }).mockReturnValue(mockFindPermission);

const mockFindRelation = jest.fn<(platformAdminRolePermissionData: { platformAdminRolePermissionRoleId: string; platformAdminRolePermissionPermissionId: string }) => Promise<PlatformAdminRolePermissionsModel | null>>();
(findPlatformAdminRolePermissionRepository as unknown as { mockReturnValue: (value: typeof mockFindRelation) => void }).mockReturnValue(mockFindRelation);

const mockCreateRelation = jest.fn<(createPlatformAdminRolePermissionData: { platformAdminRolePermissionRoleId: string; platformAdminRolePermissionPermissionId: string }) => Promise<{ platformAdminRolePermissionId: string }>>();
(createPlatformAdminRolePermissionRepository as unknown as { mockReturnValue: (value: typeof mockCreateRelation) => void }).mockReturnValue(mockCreateRelation);

describe('assignPlatformAdminRolePermissionCommandHandler', () => {
  beforeEach(() => {
    mockFindRole.mockReset();
    mockFindPermission.mockReset();
    mockFindRelation.mockReset();
    mockCreateRelation.mockReset();
  });

  it('persists the relationship and returns its identifier for an existing role and permission', async () => {
    mockFindRole.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockFindPermission.mockResolvedValue({ permissionId: 'permission-uuid-1' } as PermissionsModel);
    mockFindRelation.mockResolvedValue(null);
    mockCreateRelation.mockResolvedValue({ platformAdminRolePermissionId: 'relation-uuid-1' });

    const result = await assignPlatformAdminRolePermissionCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionId: 'permission-uuid-1' }, 'en');

    expect(mockFindRole).toHaveBeenCalledWith({ platformAdminRoleId: 'role-uuid-1' });
    expect(mockFindPermission).toHaveBeenCalledWith({ platformAdminPermissionId: 'permission-uuid-1' });
    expect(mockFindRelation).toHaveBeenCalledWith({ platformAdminRolePermissionRoleId: 'role-uuid-1', platformAdminRolePermissionPermissionId: 'permission-uuid-1' });
    expect(mockCreateRelation).toHaveBeenCalledWith({ platformAdminRolePermissionRoleId: 'role-uuid-1', platformAdminRolePermissionPermissionId: 'permission-uuid-1' });
    expect(result).toEqual({ platformAdminRolePermissionId: 'relation-uuid-1' });
  });

  it('throws a not-found exception and skips persistence when the role does not exist', async () => {
    mockFindRole.mockResolvedValue(null);

    await expect(assignPlatformAdminRolePermissionCommandHandler({ platformAdminRoleId: 'missing-role', platformAdminPermissionId: 'permission-uuid-1' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockFindPermission).not.toHaveBeenCalled();
    expect(mockCreateRelation).not.toHaveBeenCalled();
  });

  it('throws a not-found exception and skips persistence when the permission does not exist', async () => {
    mockFindRole.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockFindPermission.mockResolvedValue(null);

    await expect(assignPlatformAdminRolePermissionCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionId: 'missing-permission' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockFindRelation).not.toHaveBeenCalled();
    expect(mockCreateRelation).not.toHaveBeenCalled();
  });

  it('throws a conflict exception and keeps data untouched when the assignment already exists', async () => {
    mockFindRole.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockFindPermission.mockResolvedValue({ permissionId: 'permission-uuid-1' } as PermissionsModel);
    mockFindRelation.mockResolvedValue({ platformAdminRolePermissionId: 'relation-uuid-1' } as PlatformAdminRolePermissionsModel);

    await expect(assignPlatformAdminRolePermissionCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionId: 'permission-uuid-1' }, 'en')).rejects.toMatchObject({ statusCode: 409 });

    expect(mockCreateRelation).not.toHaveBeenCalled();
  });
});
