export interface GetAllPlatformAdminRoleResponseDTO {
  platformAdminRoleId: string;
  platformAdminRoleKey: string;
  platformAdminRoleNameFa: string;
  platformAdminRoleNameEn: string;
  platformAdminRoleDescriptionFa: string | null;
  platformAdminRoleDescriptionEn: string | null;
  platformAdminRoleIsActive: boolean;
  platformAdminRoleCreatedAt: Date;
}
