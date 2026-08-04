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

  const superAdminRole = await roleRepository.findOne({
    where: {
      platformAdminRoleKey: 'super_admin',
    },
  });

  const permissions = await permissionRepository.find();

  if (permissions.length === 0) {
    loggerConfig.warn('No permissions found - Platform Admin Role Permission Seed Skipped!');
    return;
  }

  const existingRolePermissions = await rolePermissionRepository.find({
    where: {
      platformAdminRolePermissionRoleId: superAdminRole?.platformAdminRoleId,
    },
  });

  const existingPermissionIds = new Set(existingRolePermissions.map((item) => item.platformAdminRolePermissionPermissionId));

  const newRolePermissions = permissions
    .filter((permission) => !existingPermissionIds.has(permission.permissionId))
    .map((permission) =>
      rolePermissionRepository.create({
        platformAdminRolePermissionRoleId: superAdminRole?.platformAdminRoleId,
        platformAdminRolePermissionPermissionId: permission.permissionId,
      }),
    );

  if (newRolePermissions.length === 0) {
    loggerConfig.info('Platform Admin Role Permissions are already synchronized!');
    return;
  }

  await rolePermissionRepository.save(newRolePermissions);

  loggerConfig.info('Platform Admin Role Permissions Table has no Data - Seed Runned and Data insert !');
};
