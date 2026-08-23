import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { findPlatformAdminRoleByIdQueryHandler } from '@/modules/v1/platform-admins/application/queries/platform-admin-role/handlers/find-platform-admin-role-by-id.handler';

import { findPlatformAdminRoleByIdRepository } from '@/modules/v1/platform-admins/infrastructure';

jest.mock('@/modules/v1/platform-admins/infrastructure', () => ({
  findPlatformAdminRoleByIdRepository: jest.fn(),
}));

const mockFindById = jest.fn<(platformAdminRoleData: { platformAdminRoleId: string }) => Promise<PlatformAdminRolesModel | null>>();
(findPlatformAdminRoleByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindById) => void }).mockReturnValue(mockFindById);

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
    platformAdminRoleDeletedAt: null,
    platformAdminRoleAdmins: [],
    platformAdminRolePermissions: [
      {
        platformAdminRolePermissionId: 'rp-1',
        platformAdminRolePermissionPermissionId: 'p-1',
        platformAdminRolePermissionPermission: {
          permissionId: 'p-1',
          permissionKey: 'authz.platform-admin-role.list.read',
          permissionSubject: 'PLATFORM_ADMIN',
          permissionResource: 'platform_admin_authz_role_list',
          permissionVersion: 1,
          permissionModule: 'platform-admin-role',
          permissionAction: 'read',
          permissionType: 'action',
          permissionLabelFa: 'دریافت لیست نقش های ادمین',
          permissionLabelEn: 'Get Platform Admin Role List',
          permissionDescriptionFa: null,
          permissionDescriptionEn: null,
          permissionNavigation: null,
          permissionIsActive: true,
        },
      },
    ],
  }) as unknown as PlatformAdminRolesModel;

describe('findPlatformAdminRoleByIdQueryHandler', () => {
  beforeEach(() => {
    mockFindById.mockReset();
  });

  it('passes the role id through to the repository and returns the mapped role with permissions', async () => {
    mockFindById.mockResolvedValue(buildModelRow() as never);

    const result = await findPlatformAdminRoleByIdQueryHandler({ platformAdminRoleId: 'role-uuid-1' }, 'en');

    expect(mockFindById).toHaveBeenCalledWith({ platformAdminRoleId: 'role-uuid-1' });
    expect(result).toMatchObject({
      platformAdminRoleId: 'role-uuid-1',
      platformAdminRoleKey: 'super_admin',
      platformAdminRoleIsActive: true,
      platformAdminRolePermissions: [
        {
          platformAdminRolePermissionId: 'rp-1',
          platformAdminRolePermissionPermission: {
            permissionKey: 'authz.platform-admin-role.list.read',
            permissionAction: 'read',
            permissionIsActive: true,
          },
        },
      ],
    });
  });

  it('strips internal relation and soft-delete fields from the result', async () => {
    mockFindById.mockResolvedValue(buildModelRow() as never);

    const result = await findPlatformAdminRoleByIdQueryHandler({ platformAdminRoleId: 'role-uuid-1' }, 'en');

    expect(result).not.toHaveProperty('platformAdminRoleAdmins');
    expect(result).not.toHaveProperty('platformAdminRoleDeletedAt');
  });

  it('throws a not-found exception when the repository returns null', async () => {
    mockFindById.mockResolvedValue(null as unknown as PlatformAdminRolesModel);

    await expect(findPlatformAdminRoleByIdQueryHandler({ platformAdminRoleId: 'missing-id' }, 'en')).rejects.toMatchObject({
      statusCode: 404,
    });

    expect(mockFindById).toHaveBeenCalledWith({ platformAdminRoleId: 'missing-id' });
  });
});
