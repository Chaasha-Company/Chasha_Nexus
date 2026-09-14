import type { Language } from '@/infrastructure/translator-system/i18n';

export interface GetListOptionBusinessRoleResponseDTO {
  businessRoleSearch: {
    businessRoleSearchField: string;
    businessRoleSearchLabels: string[];
  }[];

  businessRoleFilters: {
    businessRoleIsActive: {
      businessRoleIsActiveValue: boolean;
      businessRoleIsActiveLabels: Record<Language, string>;
    }[];
  };
}
