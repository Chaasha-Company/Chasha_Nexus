export interface GetAllBusinessRoleResponseDTO {
  businessRoleId: string;
  businessRoleKey: string;
  businessRoleNameFa: string;
  businessRoleNameEn: string;
  businessRoleDescriptionFa: string | null;
  businessRoleDescriptionEn: string | null;
  businessRoleIsActive: boolean;
  businessRoleCreatedAt: Date;
  businessRoleUpdatedAt: Date;
}
