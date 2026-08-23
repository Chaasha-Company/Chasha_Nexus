import type { AtLeastOne } from '@/shared/v1/types/other';

export type UpdatePlatformAdminRoleCommand = { platformAdminRoleId: string } & AtLeastOne<{
  platformAdminRoleNameFa?: string;
  platformAdminRoleNameEn?: string;
  platformAdminRoleDescriptionFa?: string;
  platformAdminRoleDescriptionEn?: string;
}>;
