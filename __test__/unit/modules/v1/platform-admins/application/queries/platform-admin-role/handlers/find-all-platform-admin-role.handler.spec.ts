import type { GetAllPlatformAdminRoleRequestQueryDTO } from '@/modules/v1/authorizations/presentation';
import type { FindAllPlatformAdminRoleQuery } from '@/modules/v1/platform-admins/application';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';
import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { findAllPlatformAdminRoleQueryHandler } from '@/modules/v1/platform-admins/application/queries/platform-admin-role/handlers/find-all-platform-admin-role.handler';

import { findAllPlatformAdminRoleRepository } from '@/modules/v1/platform-admins/infrastructure';

jest.mock('@/modules/v1/platform-admins/infrastructure', () => ({
  findAllPlatformAdminRoleRepository: jest.fn(),
}));

const mockFindAll = jest.fn<(platformAdminRoleData: FindAllPlatformAdminRoleQuery) => Promise<PaginationResponseRepository<PlatformAdminRolesModel>>>();
(findAllPlatformAdminRoleRepository as unknown as { mockReturnValue: (value: typeof mockFindAll) => void }).mockReturnValue(mockFindAll);

const buildQuery = (overrides: Partial<GetAllPlatformAdminRoleRequestQueryDTO>): GetAllPlatformAdminRoleRequestQueryDTO => ({
  paginationPage: '2',
  paginationLimit: '10',
  ...overrides,
});

const buildModelRow = (): PlatformAdminRolesModel =>
  ({
    platformAdminRoleId: 'role-uuid-1',
    platformAdminRoleKey: 'super_admin',
    platformAdminRoleNameFa: 'مدیر ارشد',
    platformAdminRoleNameEn: 'Super Admin',
    platformAdminRoleDescriptionFa: null,
    platformAdminRoleDescriptionEn: null,
    platformAdminRoleIsActive: true,
    platformAdminRoleCreatedAt: new Date('2026-08-23T10:00:00.000Z'),
    platformAdminRoleUpdatedAt: new Date('2026-08-23T11:30:00.000Z'),
  }) as unknown as PlatformAdminRolesModel;

describe('findAllPlatformAdminRoleQueryHandler', () => {
  beforeEach(() => {
    mockFindAll.mockReset();
    (findAllPlatformAdminRoleRepository as jest.Mock).mockClear();
  });

  it('computes pagination skip from page and limit and returns paginated result', async () => {
    const rows = [buildModelRow()];
    mockFindAll.mockResolvedValue({ data: rows, count: 11 } as PaginationResponseRepository<PlatformAdminRolesModel>);

    const result = await findAllPlatformAdminRoleQueryHandler(buildQuery({}));

    expect(findAllPlatformAdminRoleRepository).toHaveBeenCalledTimes(1);
    expect(mockFindAll).toHaveBeenCalledWith(
      expect.objectContaining({
        platformAdminRoleSearchQuery: undefined,
        platformAdminRoleIsActiveQuery: undefined,
        platformAdminRolePaginationSkip: 10,
        platformAdminRolePaginationTake: 10,
      }),
    );
    expect(result.count).toBe(11);
    expect(result.data).toEqual([
      {
        platformAdminRoleId: 'role-uuid-1',
        platformAdminRoleKey: 'super_admin',
        platformAdminRoleNameFa: 'مدیر ارشد',
        platformAdminRoleNameEn: 'Super Admin',
        platformAdminRoleDescriptionFa: null,
        platformAdminRoleDescriptionEn: null,
        platformAdminRoleIsActive: true,
        platformAdminRoleCreatedAt: new Date('2026-08-23T10:00:00.000Z'),
        platformAdminRoleUpdatedAt: new Date('2026-08-23T11:30:00.000Z'),
      },
    ]);
  });

  it('passes the search query through to the repository', async () => {
    mockFindAll.mockResolvedValue({ data: [], count: 0 });

    await findAllPlatformAdminRoleQueryHandler(buildQuery({ platformAdminRoleSearch: 'admin' }));

    expect(mockFindAll).toHaveBeenCalledWith(expect.objectContaining({ platformAdminRoleSearchQuery: 'admin' }));
  });

  it("converts the isActive filter string 'true' to a boolean", async () => {
    mockFindAll.mockResolvedValue({ data: [], count: 0 });

    await findAllPlatformAdminRoleQueryHandler(buildQuery({ platformAdminRoleIsActive: 'true' }));

    expect(mockFindAll).toHaveBeenCalledWith(expect.objectContaining({ platformAdminRoleIsActiveQuery: true }));
  });

  it("converts the isActive filter string 'false' to a boolean", async () => {
    mockFindAll.mockResolvedValue({ data: [], count: 0 });

    await findAllPlatformAdminRoleQueryHandler(buildQuery({ platformAdminRoleIsActive: 'false' }));

    expect(mockFindAll).toHaveBeenCalledWith(expect.objectContaining({ platformAdminRoleIsActiveQuery: false }));
  });
});
