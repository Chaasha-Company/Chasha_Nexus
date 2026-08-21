import type { Language } from '@/infrastructure/translator-system/i18n';

export interface GetListOptionPlatformAdminRoleResponseDTO {
  platformAdminRoleSearch: {
    platformAdminRoleSearchField: string;
    platformAdminRoleSearchLabels: string[];
  }[];

  platformAdminRoleFilters: {
    platformAdminRoleIsActive: {
      platformAdminRoleIsActiveValue: boolean;
      platformAdminRoleIsActiveLabels: Record<Language, string>;
    }[];
  };
}
