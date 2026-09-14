export interface CreateBusinessRoleCommand {
  businessRoleBusinessId: string;
  businessRoleKey: string;
  businessRoleNameFa: string;
  businessRoleNameEn: string;
  businessRoleDescriptionFa: string | null;
  businessRoleDescriptionEn: string | null;
}
