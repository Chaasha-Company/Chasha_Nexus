export interface DetailBusinessRoleResponseDTO {
  businessRoleId: string;
  businessRoleKey: string;
  businessRoleNameFa: string;
  businessRoleNameEn: string;
  businessRoleDescriptionFa: string | null;
  businessRoleDescriptionEn: string | null;
  businessRoleIsActive: boolean;
  businessRoleCreatedAt: Date;
  businessRoleUpdatedAt: Date;

  businessRolePermissions: {
    businessRolePermissionId: string;

    businessRolePermissionPermission: {
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
