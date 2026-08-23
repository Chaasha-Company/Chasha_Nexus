import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { updatePlatformAdminRoleCommandHandler } from '@/modules/v1/platform-admins/application/commands/platform-admin-role/handlers/update-platform-admin-role.handler';

import { findPlatformAdminRoleByIdRepository, updatePlatformAdminRoleRepository } from '@/modules/v1/platform-admins/infrastructure';

jest.mock('@/modules/v1/platform-admins/infrastructure', () => ({
  findPlatformAdminRoleByIdRepository: jest.fn(),
  updatePlatformAdminRoleRepository: jest.fn(),
}));

const mockFindById = jest.fn<(platformAdminRoleData: { platformAdminRoleId: string }) => Promise<PlatformAdminRolesModel | null>>();
(findPlatformAdminRoleByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindById) => void }).mockReturnValue(mockFindById);

const mockUpdate = jest.fn<(updatePlatformAdminRoleData: { platformAdminRoleId: string; platformAdminRoleNameFa?: string; platformAdminRoleNameEn?: string; platformAdminRoleDescriptionFa?: string; platformAdminRoleDescriptionEn?: string }) => Promise<void>>();
(updatePlatformAdminRoleRepository as unknown as { mockReturnValue: (value: typeof mockUpdate) => void }).mockReturnValue(mockUpdate);

describe('updatePlatformAdminRoleCommandHandler', () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockUpdate.mockReset();
  });

  it('persists only the provided editable fields for an existing role', async () => {
    mockFindById.mockResolvedValue({ platformAdminRoleId: 'role-uuid-1' } as PlatformAdminRolesModel);
    mockUpdate.mockResolvedValue(undefined);

    await updatePlatformAdminRoleCommandHandler({ platformAdminRoleId: 'role-uuid-1', platformAdminRoleNameEn: 'Renamed' }, 'en');

    expect(mockFindById).toHaveBeenCalledWith({ platformAdminRoleId: 'role-uuid-1' });
    expect(mockUpdate).toHaveBeenCalledWith({
      platformAdminRoleId: 'role-uuid-1',
      platformAdminRoleNameEn: 'Renamed',
    });
  });

  it('throws a not-found exception and skips persistence when the role does not exist', async () => {
    mockFindById.mockResolvedValue(null);

    await expect(updatePlatformAdminRoleCommandHandler({ platformAdminRoleId: 'missing-id', platformAdminRoleNameEn: 'Renamed' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
