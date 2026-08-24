import type { PlatformAdminRolePermissionsModel, PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import type { PermissionsModel } from '@/shared/v1/database/schema/permissions';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { removePlatformAdminRolePermissionCommandHandler } from '@/modules/v1/platform-admins/application/commands/platform-admin-role/handlers/remove-platform-admin-role-permission.handler';

import { deletePlatformAdminRolePermissionRepository, findPlatformAdminRoleByIdRepository, findPlatformAdminRolePermissionRepository } from '@/modules/v1/platform-admins/infrastructure';
import { findPlatformAdminPermissionByIdRepository } from '@/modules/v1/authorizations/infrastructure';

jest.mock('@/modules/v1/platform-admins/infrastructure', () => ({
  findPlatformAdminRoleByIdRepository: jest.fn(),
  findPlatformAdminRolePermissionRepository: jest.fn(),
  deletePlatformAdminRolePermissionRepository: jest.fn(),
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

const mockDeleteRelation = jest.fn<(deletePlatformAdminRolePermissionData: { platformAdminRolePermissionRoleId: string; platformAdminRolePermissionPermissionId: string }) => Promise<void>>();
(deletePlatformAdminRolePermissionRepository as unknown as { mockReturnValue: (value: typeof mockDeleteRelation) => void }).mockReturnValue(mockDeleteRelation);

describe('removePlatformAdminRolePermissionCommandHandler', () => {
  beforeEach(() => {
    mockFindRole.mockReset();
    mockFindPermission.mockReset();
    mockFindRelation.mockReset();
    mockDeleteRelation.mockReset();
  });

  it('removes exactly the requested relationship for an existing role and permission assignment', async () => {
    mockFindRole.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockFindPermission.mockResolvedValue({ permissionId: 'permission-uuid-1' } as PermissionsModel);
    mockFindRelation.mockResolvedValue({ platformAdminRolePermissionId: 'relation-uuid-1' } as PlatformAdminRolePermissionsModel);
    mockDeleteRelation.mockResolvedValue(undefined);

    await removePlatformAdminRolePermissionCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionId: 'permission-uuid-1' }, 'en');

    expect(mockFindRole).toHaveBeenCalledWith({ platformAdminRoleId: 'role-uuid-1' });
    expect(mockFindPermission).toHaveBeenCalledWith({ platformAdminPermissionId: 'permission-uuid-1' });
    expect(mockDeleteRelation).toHaveBeenCalledWith({ platformAdminRolePermissionRoleId: 'role-uuid-1', platformAdminRolePermissionPermissionId: 'permission-uuid-1' });
  });

  it('throws a not-found exception and skips removal when the role does not exist', async () => {
    mockFindRole.mockResolvedValue(null);

    await expect(removePlatformAdminRolePermissionCommandHandler({ platformAdminRoleId: 'missing-role', platformAdminPermissionId: 'permission-uuid-1' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockFindPermission).not.toHaveBeenCalled();
    expect(mockDeleteRelation).not.toHaveBeenCalled();
  });

  it('throws a not-found exception and skips removal when the permission does not exist', async () => {
    mockFindRole.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockFindPermission.mockResolvedValue(null);

    await expect(removePlatformAdminRolePermissionCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionId: 'missing-permission' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockFindRelation).not.toHaveBeenCalled();
    expect(mockDeleteRelation).not.toHaveBeenCalled();
  });

  it('throws a not-found exception and keeps data untouched when the assignment does not exist', async () => {
    mockFindRole.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockFindPermission.mockResolvedValue({ permissionId: 'permission-uuid-1' } as PermissionsModel);
    mockFindRelation.mockResolvedValue(null);

    await expect(removePlatformAdminRolePermissionCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionId: 'permission-uuid-1' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockDeleteRelation).not.toHaveBeenCalled();
  });

  it('targets only the composite relationship identifiers on removal', async () => {
    mockFindRole.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockFindPermission.mockResolvedValue({ permissionId: 'permission-uuid-1' } as PermissionsModel);
    mockFindRelation.mockResolvedValue({ platformAdminRolePermissionId: 'relation-uuid-1' } as PlatformAdminRolePermissionsModel);
    mockDeleteRelation.mockResolvedValue(undefined);

    await removePlatformAdminRolePermissionCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionId: 'permission-uuid-1' }, 'en');

    expect(mockDeleteRelation).toHaveBeenCalledTimes(1);
    const deletionCriteria = mockDeleteRelation.mock.calls[0]?.[0];
    expect(deletionCriteria).toEqual({ platformAdminRolePermissionRoleId: 'role-uuid-1', platformAdminRolePermissionPermissionId: 'permission-uuid-1' });
  });
});
