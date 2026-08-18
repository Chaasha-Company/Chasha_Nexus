import type { FindAllPlatformAdminPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { GetAllPlatformAdminPermissionQueryResult } from '../results/get-all-platform-admin-permission.results';
import { findAllPlatformAdminPermissionByRoleIdRepository } from '@/modules/v1/authorizations/infrastructure';

export const getAllPlatformAdminPermissionQueryHandler = async (platformAdminPermissionData: FindAllPlatformAdminPermissionByRoleIdQuery): Promise<GetAllPlatformAdminPermissionQueryResult> => {
  const data = await findAllPlatformAdminPermissionByRoleIdRepository()({
    platformAdminPermissionRoleId: platformAdminPermissionData.platformAdminPermissionRoleId,
  });

  return data.map((item) => ({
    platformAdminRolePermissionId: item.platformAdminRolePermissionId,

    platformAdminRolePermissionPermissionId: item.platformAdminRolePermissionPermissionId,

    platformAdminRolePermissionPermission: {
      permissionId: item.platformAdminRolePermissionPermission.permissionId,

      permissionKey: item.platformAdminRolePermissionPermission.permissionKey,

      permissionSubject: item.platformAdminRolePermissionPermission.permissionSubject,

      permissionResource: item.platformAdminRolePermissionPermission.permissionResource,

      permissionVersion: item.platformAdminRolePermissionPermission.permissionVersion,

      permissionModule: item.platformAdminRolePermissionPermission.permissionModule,

      permissionAction: item.platformAdminRolePermissionPermission.permissionAction,

      permissionType: item.platformAdminRolePermissionPermission.permissionType,

      permissionLabelFa: item.platformAdminRolePermissionPermission.permissionLabelFa,

      permissionLabelEn: item.platformAdminRolePermissionPermission.permissionLabelEn,

      permissionDescriptionFa: item.platformAdminRolePermissionPermission.permissionDescriptionFa,

      permissionDescriptionEn: item.platformAdminRolePermissionPermission.permissionDescriptionEn,

      permissionNavigation: item.platformAdminRolePermissionPermission.permissionNavigation,

      permissionIsActive: item.platformAdminRolePermissionPermission.permissionIsActive,
    },
  }));
};
