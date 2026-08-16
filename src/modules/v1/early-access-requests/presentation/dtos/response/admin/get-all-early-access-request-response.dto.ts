export interface GetAllEarlyAccessRequestResponseDTO {
  earlyAccessRequestId: string;

  earlyAccessRequestStatus: {
    earlyAccessRequestStatusNameFa: string;
    earlyAccessRequestStatusNameEn: string;
    earlyAccessRequestStatusSlug: string;
    earlyAccessRequestStatusDescriptionFa: string | null;
    earlyAccessRequestStatusDescriptionEn: string | null;
    earlyAccessRequestStatusSortOrder: number;
  };

  earlyAccessRequestBusinessType: {
    businessTypeNameFa: string;
    businessTypeNameEn: string;
    businessTypeSlug: string;
    businessTypeSortOrder: number;
  };

  earlyAccessRequestFullName: string;
  earlyAccessRequestPhoneNumber: string;
  earlyAccessRequestBusinessName: string;
  earlyAccessRequestCode: string;
  earlyAccessRequestMetadata: Record<string, unknown> | null;
  earlyAccessRequestCreatedAt: Date;
  earlyAccessRequestUpdatedAt: Date;
}
