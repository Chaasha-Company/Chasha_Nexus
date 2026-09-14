import type { AtLeastOne } from '@/shared/v1/types/other';

export type UpdateEarlyAccessRequestCommand = AtLeastOne<{
  earlyAccessRequestId: string;
  earlyAccessRequestStatusId?: number;
  earlyAccessRequestBusinessTypeId?: number;
  earlyAccessRequestFullName?: string;
  earlyAccessRequestPhoneNumber?: string;
  earlyAccessRequestCode?: string;
  earlyAccessRequestBusinessName?: string;
  earlyAccessRequestMetadata?: Record<string, unknown>;
}>;
