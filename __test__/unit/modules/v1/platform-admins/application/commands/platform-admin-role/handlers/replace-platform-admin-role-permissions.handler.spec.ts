import type { PlatformAdminRolePermissionsModel, PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import type { PermissionsModel } from '@/shared/v1/database/schema/permissions';
import type { EntityManager } from 'typeorm';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { replacePlatformAdminRolePermissionsCommandHandler } from '@/modules/v1/platform-admins/application/commands/platform-admin-role/handlers/replace-platform-admin-role-permissions.handler';

import { createPlatformAdminRolePermissionRepository, deletePlatformAdminRolePermissionRepository, findPlatformAdminRoleByIdRepository } from '@/modules/v1/platform-admins/infrastructure';
import { findAllPlatformAdminPermissionByRoleIdRepository, findPlatformAdminPermissionsByIdsRepository } from '@/modules/v1/authorizations/infrastructure';
import { transactionManager } from '@/shared/v1/database/transaction';

jest.mock('@/modules/v1/platform-admins/infrastructure', () => ({
  findPlatformAdminRoleByIdRepository: jest.fn(),
  deletePlatformAdminRolePermissionRepository: jest.fn(),
  createPlatformAdminRolePermissionRepository: jest.fn(),
}));

jest.mock('@/modules/v1/authorizations/infrastructure', () => ({
  findPlatformAdminPermissionsByIdsRepository: jest.fn(),
  findAllPlatformAdminPermissionByRoleIdRepository: jest.fn(),
}));

const mockTransactionManager = jest.fn<(callback: (manager: EntityManager) => Promise<unknown>) => Promise<unknown>>();
jest.mock('@/shared/v1/database/transaction', () => ({
  transactionManager: (callback: (manager: EntityManager) => Promise<unknown>) => mockTransactionManager(callback),
}));

const mockManager = {} as EntityManager;

const mockFindRole = jest.fn<(platformAdminRoleData: { platformAdminRoleId: string }) => Promise<PlatformAdminRolesModel | null>>();
(findPlatformAdminRoleByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindRole) => void }).mockReturnValue(mockFindRole);

const mockFindPermissionsByIds = jest.fn<(platformAdminPermissionsData: { platformAdminPermissionIds: string[] }) => Promise<PermissionsModel[]>>();
(findPlatformAdminPermissionsByIdsRepository as unknown as { mockReturnValue: (value: typeof mockFindPermissionsByIds) => void }).mockReturnValue(mockFindPermissionsByIds);

const mockFindCurrent = jest.fn<(platformAdminPermissionData: { platformAdminPermissionRoleId: string }) => Promise<PlatformAdminRolePermissionsModel[]>>();
(findAllPlatformAdminPermissionByRoleIdRepository as unknown as { mockReturnValue: (value: typeof mockFindCurrent) => void }).mockReturnValue(mockFindCurrent);

const mockDeleteRelation = jest.fn<(deletePlatformAdminRolePermissionData: { platformAdminRolePermissionRoleId: string; platformAdminRolePermissionPermissionId: string }, manager?: EntityManager) => Promise<void>>();
(deletePlatformAdminRolePermissionRepository as unknown as { mockReturnValue: (value: typeof mockDeleteRelation) => void }).mockReturnValue(mockDeleteRelation);

const mockCreateRelation = jest.fn<(createPlatformAdminRolePermissionData: { platformAdminRolePermissionRoleId: string; platformAdminRolePermissionPermissionId: string }, manager?: EntityManager) => Promise<{ platformAdminRolePermissionId: string }>>();
(createPlatformAdminRolePermissionRepository as unknown as { mockReturnValue: (value: typeof mockCreateRelation) => void }).mockReturnValue(mockCreateRelation);

const roleRow = { platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel;
const permissionRows = (ids: string[]) => ids.map((permissionId) => ({ permissionId })) as unknown as PermissionsModel[];
const currentRows = (permissionIds: string[]) => permissionIds.map((id) => ({ platformAdminRolePermissionPermissionId: id })) as PlatformAdminRolePermissionsModel[];

describe('replacePlatformAdminRolePermissionsCommandHandler', () => {
  beforeEach(() => {
    mockFindRole.mockReset();
    mockFindPermissionsByIds.mockReset();
    mockFindCurrent.mockReset();
    mockDeleteRelation.mockReset();
    mockCreateRelation.mockReset();
    mockTransactionManager.mockReset();
    mockTransactionManager.mockImplementation(async (callback) => callback(mockManager));
  });

  it('reconciles the complete permission set atomically: removes obsolete, preserves existing, adds new', async () => {
    mockFindRole.mockResolvedValue(roleRow);
    mockFindPermissionsByIds.mockResolvedValue(permissionRows(['permission-b', 'permission-c', 'permission-d']));
    mockFindCurrent.mockResolvedValue(currentRows(['permission-a', 'permission-b', 'permission-c']));

    const result = await replacePlatformAdminRolePermissionsCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionIds: ['permission-b', 'permission-c', 'permission-d'] }, 'en');

    expect(mockDeleteRelation).toHaveBeenCalledTimes(1);
    expect(mockDeleteRelation).toHaveBeenCalledWith({ platformAdminRolePermissionRoleId: 'role-uuid-1', platformAdminRolePermissionPermissionId: 'permission-a' }, mockManager);
    expect(mockCreateRelation).toHaveBeenCalledTimes(1);
    expect(mockCreateRelation).toHaveBeenCalledWith({ platformAdminRolePermissionRoleId: 'role-uuid-1', platformAdminRolePermissionPermissionId: 'permission-d' }, mockManager);
    expect(mockTransactionManager).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionIds: ['permission-b', 'permission-c', 'permission-d'] });
  });

  it('performs no writes when the requested set already matches the current assignment (idempotent)', async () => {
    mockFindRole.mockResolvedValue(roleRow);
    mockFindPermissionsByIds.mockResolvedValue(permissionRows(['permission-a', 'permission-b']));
    mockFindCurrent.mockResolvedValue(currentRows(['permission-b', 'permission-a']));

    const result = await replacePlatformAdminRolePermissionsCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionIds: ['permission-a', 'permission-b'] }, 'en');

    expect(mockDeleteRelation).not.toHaveBeenCalled();
    expect(mockCreateRelation).not.toHaveBeenCalled();
    expect(result).toEqual({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionIds: ['permission-a', 'permission-b'] });
  });

  it('removes every assignment when an empty permission array is provided', async () => {
    mockFindRole.mockResolvedValue(roleRow);
    mockFindPermissionsByIds.mockResolvedValue([]);
    mockFindCurrent.mockResolvedValue(currentRows(['permission-a', 'permission-b']));

    const result = await replacePlatformAdminRolePermissionsCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionIds: [] }, 'en');

    expect(mockDeleteRelation).toHaveBeenCalledTimes(2);
    expect(mockCreateRelation).not.toHaveBeenCalled();
    expect(result).toEqual({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionIds: [] });
  });

  it('throws a not-found exception and skips persistence when the role does not exist', async () => {
    mockFindRole.mockResolvedValue(null);

    await expect(replacePlatformAdminRolePermissionsCommandHandler({ platformAdminRoleId: 'missing-role', platformAdminPermissionIds: ['permission-a'] }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockFindPermissionsByIds).not.toHaveBeenCalled();
    expect(mockTransactionManager).not.toHaveBeenCalled();
  });

  it('throws a not-found exception before any write when a requested permission does not exist', async () => {
    mockFindRole.mockResolvedValue(roleRow);
    mockFindPermissionsByIds.mockResolvedValue(permissionRows(['permission-a']));

    await expect(replacePlatformAdminRolePermissionsCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionIds: ['permission-a', 'missing-permission'] }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockDeleteRelation).not.toHaveBeenCalled();
    expect(mockCreateRelation).not.toHaveBeenCalled();
    expect(mockTransactionManager).not.toHaveBeenCalled();
  });

  it('propagates transaction failures so no partial synchronization is reported as success', async () => {
    mockFindRole.mockResolvedValue(roleRow);
    mockFindPermissionsByIds.mockResolvedValue(permissionRows(['permission-b']));
    mockFindCurrent.mockResolvedValue(currentRows(['permission-a']));
    mockTransactionManager.mockImplementation(async () => {
      throw new Error('transaction failed');
    });

    await expect(replacePlatformAdminRolePermissionsCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionIds: ['permission-b'] }, 'en')).rejects.toMatchObject({ message: 'transaction failed' });
  });
});
