export interface FindAllBusinessRoleResultQuery {
  count: number;
  data: {
    businessRoleId: string;
    businessRoleKey: string;
    businessRoleNameFa: string;
    businessRoleNameEn: string;
    businessRoleDescriptionFa: string | null;
    businessRoleDescriptionEn: string | null;
    businessRoleIsActive: boolean;
    businessRoleCreatedAt: Date;
    businessRoleUpdatedAt: Date;
  }[];
}
