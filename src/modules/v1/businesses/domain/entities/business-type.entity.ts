import type { BusinessesEntity } from './business.entity';

export interface BusinessTypesEntity {
  businessTypeId: string;
  businessTypeNameFa: string;
  businessTypeNameEn: string;
  businessTypeSlug: string;
  businessTypeSortOrder: number;
  businessTypeIsActive: boolean;
  businessTypebusinesses: BusinessesEntity[];
  businessTypeCreatedAt: Date;
  businessTypeUpdatedAt: Date;
  businessTypeDeletedAt: Date | null;
}
