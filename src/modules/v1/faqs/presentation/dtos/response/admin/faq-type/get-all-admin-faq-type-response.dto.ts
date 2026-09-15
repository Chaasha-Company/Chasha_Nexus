export interface GetAllAdminFaqTypeResponseDTO {
  faqTypeId: number;

  faqTypeNameFa: string;
  faqTypeNameEn: string;

  faqTypeSlug: string;

  faqTypeDescriptionFa: string;
  faqTypeDescriptionEn: string;

  faqTypeSortOrder: number;

  faqTypeIsActive: boolean;

  faqTypeCreatedAt: Date;
  faqTypeUpdatedAt: Date;
}
