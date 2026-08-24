import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import type { EntityManager } from 'typeorm';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { deletePlatformAdminRoleCommandHandler } from '@/modules/v1/platform-admins/application/commands/platform-admin-role/handlers/delete-platform-admin-role.handler';

import { countPlatformAdminRoleAdminsRepository, deletePlatformAdminRolePermissionsRepository, deletePlatformAdminRoleRepository, findPlatformAdminRoleByIdRepository } from '@/modules/v1/platform-admins/infrastructure';

const mockManager = {} as EntityManager;

const mockCacheRemove = jest.fn<() => Promise<void>>();
jest.mock('@/shared/v1/database/core', () => ({
  AppDataSource: {
    queryResultCache: {
      remove: (...args: unknown[]) => mockCacheRemove(...(args as [])),
    },
  },
}));

const mockTransactionManager = jest.fn<(callback: (manager: EntityManager) => Promise<unknown>) => Promise<unknown>>();
jest.mock('@/shared/v1/database/transaction', () => ({
  transactionManager: (callback: (manager: EntityManager) => Promise<unknown>) => mockTransactionManager(callback),
}));

jest.mock('@/modules/v1/platform-admins/infrastructure', () => ({
  findPlatformAdminRoleByIdRepository: jest.fn(),
  countPlatformAdminRoleAdminsRepository: jest.fn(),
  deletePlatformAdminRolePermissionsRepository: jest.fn(),
  deletePlatformAdminRoleRepository: jest.fn(),
}));

const mockFindById = jest.fn<(platformAdminRoleData: { platformAdminRoleId: string }) => Promise<PlatformAdminRolesModel | null>>();
(findPlatformAdminRoleByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindById) => void }).mockReturnValue(mockFindById);

const mockCountAdmins = jest.fn<(platformAdminRoleData: { platformAdminRoleId: string }) => Promise<number>>();
(countPlatformAdminRoleAdminsRepository as unknown as { mockReturnValue: (value: typeof mockCountAdmins) => void }).mockReturnValue(mockCountAdmins);

const mockDeletePermissions = jest.fn<(deletePlatformAdminRolePermissionsData: { platformAdminRoleId: string }, manager?: EntityManager) => Promise<void>>();
(deletePlatformAdminRolePermissionsRepository as unknown as { mockReturnValue: (value: typeof mockDeletePermissions) => void }).mockReturnValue(mockDeletePermissions);

const mockDeleteRole = jest.fn<(deletePlatformAdminRoleData: { platformAdminRoleId: string }, manager?: EntityManager) => Promise<void>>();
(deletePlatformAdminRoleRepository as unknown as { mockReturnValue: (value: typeof mockDeleteRole) => void }).mockReturnValue(mockDeleteRole);

describe('deletePlatformAdminRoleCommandHandler', () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockCountAdmins.mockReset();
    mockDeletePermissions.mockReset();
    mockDeleteRole.mockReset();
    mockTransactionManager.mockClear();
    mockCacheRemove.mockReset();
    mockTransactionManager.mockImplementation(async (callback) => callback(mockManager));
    mockCacheRemove.mockResolvedValue(undefined);
  });

  it('soft-deletes role permissions and the role inside one transaction when no admin uses the role', async () => {
    mockFindById.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockCountAdmins.mockResolvedValue(0);
    mockDeletePermissions.mockResolvedValue(undefined);
    mockDeleteRole.mockResolvedValue(undefined);

    await deletePlatformAdminRoleCommandHandler({ platformAdminRoleId: 'role-uuid-1' }, 'en');

    expect(mockDeletePermissions).toHaveBeenCalledWith({ platformAdminRoleId: 'role-uuid-1' }, mockManager);
    expect(mockDeleteRole).toHaveBeenCalledWith({ platformAdminRoleId: 'role-uuid-1' }, mockManager);
    expect(mockDeletePermissions.mock.invocationCallOrder[0]).toBeLessThan(mockDeleteRole.mock.invocationCallOrder[0] ?? 0);
    expect(mockCacheRemove).toHaveBeenCalledWith(['platform-admin-roles']);
  });

  it('throws a not-found exception and skips usage check and deletion when the role does not exist', async () => {
    mockFindById.mockResolvedValue(null);

    await expect(deletePlatformAdminRoleCommandHandler({ platformAdminRoleId: 'missing-id' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockCountAdmins).not.toHaveBeenCalled();
    expect(mockTransactionManager).not.toHaveBeenCalled();
    expect(mockCacheRemove).not.toHaveBeenCalled();
  });

  it('throws a conflict exception and keeps data untouched when active admins still reference the role', async () => {
    mockFindById.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockCountAdmins.mockResolvedValue(2);

    await expect(deletePlatformAdminRoleCommandHandler({ platformAdminRoleId: 'role-uuid-1' }, 'en')).rejects.toMatchObject({ statusCode: 409 });

    expect(mockDeletePermissions).not.toHaveBeenCalled();
    expect(mockDeleteRole).not.toHaveBeenCalled();
    expect(mockTransactionManager).not.toHaveBeenCalled();
    expect(mockCacheRemove).not.toHaveBeenCalled();
  });
});
