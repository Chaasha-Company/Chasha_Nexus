export interface FindAllPlatformAdminRoleResultQuery {
  count: number;
  data: {
    platformAdminRoleId: string;
    platformAdminRoleKey: string;
    platformAdminRoleNameFa: string;
    platformAdminRoleNameEn: string;
    platformAdminRoleDescriptionFa: string | null;
    platformAdminRoleDescriptionEn: string | null;
    platformAdminRoleIsActive: boolean;
    platformAdminRoleCreatedAt: Date;
    platformAdminRoleUpdatedAt: Date;
  }[];
}
