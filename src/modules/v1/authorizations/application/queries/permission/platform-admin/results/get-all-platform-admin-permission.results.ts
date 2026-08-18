export type GetAllPlatformAdminPermissionQueryResult = {
  platformAdminRolePermissionId: string;
  platformAdminRolePermissionPermissionId: string;

  platformAdminRolePermissionPermission: {
    permissionId: string;
    permissionKey: string;
    permissionSubject: string;
    permissionResource: string;
    permissionVersion: number;
    permissionModule: string;
    permissionAction: string;
    permissionType: string;

    permissionLabelFa: string;
    permissionLabelEn: string;

    permissionDescriptionFa: string | null;
    permissionDescriptionEn: string | null;

    permissionNavigation: {
      permissionNavigationIcon?: string;
      permissionNavigationPath?: string;
      permissionNavigationOrder?: number;
      permissionNavigationLabelEn?: string;
      permissionNavigationLabelFa?: string;
      permissionNavigationVisible: boolean;
      permissionNavigationGroupKey?: string;
      permissionNavigationParentKey?: string | null;
      permissionNavigationGroupLabelEn?: string;
      permissionNavigationGroupLabelFa?: string;
    } | null;

    permissionIsActive: boolean;
  };
}[];
