import type { BusinessTypesEntity } from '@/modules/v1/businesses';
import type { EarlyAccessRequestStatusesEntity } from './early-access-status.entity';

export interface EarlyAccessRequestsEntity {
  earlyAccessRequestId: string;
  earlyAccessRequestStatusId: number;
  earlyAccessRequestStatus: EarlyAccessRequestStatusesEntity;
  earlyAccessRequestBusinessTypeId: number;
  earlyAccessRequestBusinessType: BusinessTypesEntity;
  earlyAccessRequestFullName: string;
  earlyAccessRequestPhoneNumber: string;
  earlyAccessRequestCode: string;
  earlyAccessRequestBusinessName: string;
  earlyAccessRequestMetadata: Record<string, unknown> | null;
  earlyAccessRequestCreatedAt: Date;
  earlyAccessRequestUpdatedAt: Date;
  earlyAccessRequestDeletedAt: Date | null;
}
