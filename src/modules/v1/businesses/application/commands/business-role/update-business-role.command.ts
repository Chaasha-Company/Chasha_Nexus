import type { AtLeastOne } from '@/shared/v1/types/other';

export type UpdateBusinessRoleCommand = {
  businessRoleId: string;
  businessRoleBusinessId: string;
} & AtLeastOne<{
  businessRoleNameFa?: string;
  businessRoleNameEn?: string;
  businessRoleDescriptionFa?: string;
  businessRoleDescriptionEn?: string;
}>;
