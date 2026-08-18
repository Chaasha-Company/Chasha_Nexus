import type { FindAllBusinessPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { GetAllBusienssPermissionQueryResult } from '../results/get-all-business-permission.results';
import { findAllBusinessPermissionByRoleIdRepository } from '@/modules/v1/authorizations/infrastructure/repositories/permission';

export const getAllBusinessPermissionQueryHandler = async (businessPermissionData: FindAllBusinessPermissionByRoleIdQuery): Promise<GetAllBusienssPermissionQueryResult> => {
  const data = await findAllBusinessPermissionByRoleIdRepository()({
    businessPermissionRoleId: businessPermissionData.businessPermissionRoleId,
  });

  return data.map((item) => ({
    businessRolePermissionId: item.businessRolePermissionId,

    businessRolePermissionPermissionId: item.businessRolePermissionPermissionId,

    businessRolePermissionPermission: {
      permissionId: item.businessRolePermissionPermission.permissionId,

      permissionKey: item.businessRolePermissionPermission.permissionKey,

      permissionSubject: item.businessRolePermissionPermission.permissionSubject,

      permissionResource: item.businessRolePermissionPermission.permissionResource,

      permissionVersion: item.businessRolePermissionPermission.permissionVersion,

      permissionModule: item.businessRolePermissionPermission.permissionModule,

      permissionAction: item.businessRolePermissionPermission.permissionAction,

      permissionType: item.businessRolePermissionPermission.permissionType,

      permissionLabelFa: item.businessRolePermissionPermission.permissionLabelFa,

      permissionLabelEn: item.businessRolePermissionPermission.permissionLabelEn,

      permissionDescriptionFa: item.businessRolePermissionPermission.permissionDescriptionFa,

      permissionDescriptionEn: item.businessRolePermissionPermission.permissionDescriptionEn,

      permissionNavigation: item.businessRolePermissionPermission.permissionNavigation,

      permissionIsActive: item.businessRolePermissionPermission.permissionIsActive,
    },
  }));
};
