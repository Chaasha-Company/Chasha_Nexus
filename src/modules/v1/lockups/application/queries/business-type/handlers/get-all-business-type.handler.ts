import type { GetAllBusinessTypeQueryResult } from '../results';
import { getAllBusinessTypeRepository } from '@/modules/v1/businesses';

export const getAllBusinessTypeQueryHandler = async (): GetAllBusinessTypeQueryResult => {
  const businessTypes = await getAllBusinessTypeRepository()();

  return businessTypes.map((item) => ({
    businessTypeNameFa: item.businessTypeNameFa,
    businessTypeNameEn: item.businessTypeNameEn,
    businessTypeSlug: item.businessTypeSlug,
    businessTypeSortOrder: item.businessTypeSortOrder,
  }));
};
