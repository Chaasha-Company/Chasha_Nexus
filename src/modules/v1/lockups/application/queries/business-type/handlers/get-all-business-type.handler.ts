import type { GetAllBusinessTypeResponseDTO } from '@/modules/v1/lockups/presentation';
import { getAllBusinessTypeRepository } from '@/modules/v1/businesses';

export const getAllBusinessTypeQueryHandler = async (): Promise<GetAllBusinessTypeResponseDTO[]> => {
  const businessTypes = await getAllBusinessTypeRepository()();

  return businessTypes.map((item) => ({
    businessTypeNameFa: item.businessTypeNameFa,
    businessTypeNameEn: item.businessTypeNameEn,
    businessTypeSlug: item.businessTypeSlug,
    businessTypeSortOrder: item.businessTypeSortOrder,
  }));
};
