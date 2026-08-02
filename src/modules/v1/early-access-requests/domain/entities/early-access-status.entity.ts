import type { EarlyAccessRequestsEntity } from './early-access-request.entity';

export interface EarlyAccessRequestStatusesEntity {
  earlyAccessRequestStatusId: number;
  earlyAccessRequestStatusNameEn: string;
  earlyAccessRequestStatusNameFa: string;
  earlyAccessRequestStatusSlug: string;
  earlyAccessRequestStatusDescriptionEn: string | null;
  earlyAccessRequestStatusDescriptionFa: string | null;
  earlyAccessRequestStatusSortOrder: number;
  earlyAccessRequestStatusIsSystem: boolean;
  EarlyAccessRequests: EarlyAccessRequestsEntity[];
  earlyAccessRequestStatusCreatedAt: Date;
  earlyAccessRequestStatusUpdatedAt: Date;
  earlyAccessRequestStatusDeletedAt: Date | null;
}
