import type { Language } from '@/infrastructure/translator-system/i18n';

export type GetBusinessRoleListOptionQueryResult = Promise<{
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
}>;
