import type { Language } from '@/infrastructure/translator-system/i18n';

export interface GetListOptionEarlyAccessRequestResponseDTO {
  earlyAccessRequestSearch: {
    earlyAccessRequestSearchField: string;
    earlyAccessRequestSearchLabels: string[];
  }[];

  earlyAccessRequestFilters: {
    earlyAccessRequestStatus: {
      earlyAccessRequestStatusId: number;
      earlyAccessRequestStatusLabels: Record<Language, string>;
    }[];
  };
}
