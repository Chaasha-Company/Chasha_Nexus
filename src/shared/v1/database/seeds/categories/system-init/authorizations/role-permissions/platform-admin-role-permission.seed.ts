// TODO: This seed contains temporary test data.
// Replace final authorization strategy.

import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { PlatformAdminRolesModel, PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';

export const createPlatformAdminRolePermissionDataSeed = async (): Promise<void> => {
  const rolePermissionRepository = AppDataSource.getRepository(PlatformAdminRolePermissionsModel);

  const roleRepository = AppDataSource.getRepository(PlatformAdminRolesModel);

  const permissionRepository = AppDataSource.getRepository(PermissionsModel);

  const tableHasData = await rolePermissionRepository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Platform Admin Role Permissions Table has Data - Seed Skipped!');
    return;
  }

  const superAdminRole = await roleRepository.findOne({
    where: {
      platformAdminRoleKey: 'super_admin',
    },
  });

  const permissions = await permissionRepository.find();

  const rolePermissions = permissions.map((permission) =>
    rolePermissionRepository.create({
      platformAdminRolePermissionRoleId: superAdminRole?.platformAdminRoleId,

      platformAdminRolePermissionPermissionId: permission.permissionId,
    }),
  );

  await rolePermissionRepository.save(rolePermissions);

  loggerConfig.info('Platform Admin Role Permissions Seed Completed Successfully!');
};
