export interface DetailPlatformAdminRoleResponseDTO {
  platformAdminRoleId: string;
  platformAdminRoleKey: string;
  platformAdminRoleNameFa: string;
  platformAdminRoleNameEn: string;
  platformAdminRoleDescriptionFa: string | null;
  platformAdminRoleDescriptionEn: string | null;
  platformAdminRoleIsActive: boolean;
  platformAdminRoleCreatedAt: Date;
  platformAdminRoleUpdatedAt: Date;

  platformAdminRolePermissions: {
    platformAdminRolePermissionId: string;

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
        permissionNavigationVisible: boolean;

        permissionNavigationGroupKey?: string;

        permissionNavigationGroupLabelFa?: string;

        permissionNavigationGroupLabelEn?: string;

        permissionNavigationParentKey?: string | null;

        permissionNavigationLabelFa?: string;

        permissionNavigationLabelEn?: string;

        permissionNavigationPath?: string;

        permissionNavigationIcon?: string;

        permissionNavigationOrder?: number;
      } | null;

      permissionIsActive: boolean;
    };
  }[];
}
