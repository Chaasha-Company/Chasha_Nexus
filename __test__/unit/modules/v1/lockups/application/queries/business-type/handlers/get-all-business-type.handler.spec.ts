import type { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { getAllBusinessTypeQueryHandler } from '@/modules/v1/lockups/application/queries/business-type/handlers/get-all-business-type.handler';

import { getAllBusinessTypeRepository } from '@/modules/v1/businesses';

jest.mock('@/modules/v1/businesses', () => ({
  getAllBusinessTypeRepository: jest.fn(),
}));

const mockGetAll = jest.fn<() => Promise<BusinessTypesModel[]>>();
(getAllBusinessTypeRepository as unknown as { mockReturnValue: (value: typeof mockGetAll) => void }).mockReturnValue(mockGetAll);

const businessTypeRows: BusinessTypesModel[] = [
  {
    businessTypeNameFa: 'رستوران',
    businessTypeNameEn: 'Restaurant',
    businessTypeSlug: 'restaurant',
    businessTypeSortOrder: 1,
  },
  {
    businessTypeNameFa: 'کافه',
    businessTypeNameEn: 'Cafe',
    businessTypeSlug: 'cafe',
    businessTypeSortOrder: 2,
  },
] as BusinessTypesModel[];

describe('getAllBusinessTypeQueryHandler', () => {
  beforeEach(() => {
    mockGetAll.mockReset();
  });

  it('maps every business type to its public fields, preserving order', async () => {
    mockGetAll.mockResolvedValue(businessTypeRows);

    const result = await getAllBusinessTypeQueryHandler();

    expect(result).toEqual([
      { businessTypeNameFa: 'رستوران', businessTypeNameEn: 'Restaurant', businessTypeSlug: 'restaurant', businessTypeSortOrder: 1 },
      { businessTypeNameFa: 'کافه', businessTypeNameEn: 'Cafe', businessTypeSlug: 'cafe', businessTypeSortOrder: 2 },
    ]);
  });

  it('returns an empty list when no business types exist', async () => {
    mockGetAll.mockResolvedValue([]);

    await expect(getAllBusinessTypeQueryHandler()).resolves.toEqual([]);
  });
});
