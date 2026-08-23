import type { CreatePlatformAdminRoleRequestDTO } from '@/modules/v1/authorizations/presentation';
import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { createPlatformAdminRoleCommandHandler } from '@/modules/v1/platform-admins/application/commands/platform-admin-role/handlers/create-platform-admin-role.handler';

import { createPlatformAdminRoleRepository, findPlatformAdminRoleByKeyRepository } from '@/modules/v1/platform-admins/infrastructure';

jest.mock('@/modules/v1/platform-admins/infrastructure', () => ({
  createPlatformAdminRoleRepository: jest.fn(),
  findPlatformAdminRoleByKeyRepository: jest.fn(),
}));

const mockFindByKey = jest.fn<(platformAdminRoleData: { platformAdminRoleKey: string }) => Promise<PlatformAdminRolesModel | null>>();
(findPlatformAdminRoleByKeyRepository as unknown as { mockReturnValue: (value: typeof mockFindByKey) => void }).mockReturnValue(mockFindByKey);

const mockCreate =
  jest.fn<
    (createPlatformAdminRoleData: {
      platformAdminRoleKey: string;
      platformAdminRoleNameFa: string;
      platformAdminRoleNameEn: string;
      platformAdminRoleDescriptionFa: string | null;
      platformAdminRoleDescriptionEn: string | null;
    }) => Promise<{ platformAdminRoleId: string }>
  >();
(createPlatformAdminRoleRepository as unknown as { mockReturnValue: (value: typeof mockCreate) => void }).mockReturnValue(mockCreate);

const buildBody = (): CreatePlatformAdminRoleRequestDTO => ({
  platformAdminRoleKey: 'manager',
  platformAdminRoleNameFa: 'مدیر',
  platformAdminRoleNameEn: 'Manager',
});

describe('createPlatformAdminRoleCommandHandler', () => {
  beforeEach(() => {
    mockFindByKey.mockReset();
    mockCreate.mockReset();
  });

  it('creates the role and returns its identifier when the key is not taken', async () => {
    mockFindByKey.mockResolvedValue(null);
    mockCreate.mockResolvedValue({ platformAdminRoleId: 'new-role-uuid' });

    const result = await createPlatformAdminRoleCommandHandler(buildBody(), 'en');

    expect(mockFindByKey).toHaveBeenCalledWith({ platformAdminRoleKey: 'manager' });
    expect(mockCreate).toHaveBeenCalledWith({
      platformAdminRoleKey: 'manager',
      platformAdminRoleNameFa: 'مدیر',
      platformAdminRoleNameEn: 'Manager',
      platformAdminRoleDescriptionFa: null,
      platformAdminRoleDescriptionEn: null,
    });
    expect(result).toEqual({ platformAdminRoleId: 'new-role-uuid' });
  });

  it('normalizes omitted descriptions to null before persistence', async () => {
    mockFindByKey.mockResolvedValue(null);
    mockCreate.mockResolvedValue({ platformAdminRoleId: 'new-role-uuid' });

    await createPlatformAdminRoleCommandHandler(
      {
        ...buildBody(),
        platformAdminRoleDescriptionFa: 'توضیحات',
        platformAdminRoleDescriptionEn: 'description',
      },
      'en',
    );

    expect(mockCreate).toHaveBeenCalledWith({
      platformAdminRoleKey: 'manager',
      platformAdminRoleNameFa: 'مدیر',
      platformAdminRoleNameEn: 'Manager',
      platformAdminRoleDescriptionFa: 'توضیحات',
      platformAdminRoleDescriptionEn: 'description',
    });
  });

  it('rejects with a conflict exception and skips persistence when the key already exists', async () => {
    mockFindByKey.mockResolvedValue({ platformAdminRoleId: 'existing-uuid' } as PlatformAdminRolesModel);

    await expect(createPlatformAdminRoleCommandHandler(buildBody(), 'en')).rejects.toMatchObject({
      statusCode: 409,
    });

    expect(mockCreate).not.toHaveBeenCalled();
  });
});
