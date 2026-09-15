import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { findPaginatedAdminFaqTypeQueryHandler } from '@/modules/v1/faqs/application/queries/admin/faq-type/handlers/find-paginated-admin-faq-type.handler';

import { findPaginatedAdminFaqTypeRepository } from '@/modules/v1/faqs/infrastructure';

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findPaginatedAdminFaqTypeRepository: jest.fn(),
}));

const mockFindAll = jest.fn<(data: { faqTypeSearchQuery?: string; faqTypePaginationSkip: number; faqTypePaginationTake: number }) => Promise<{ count: number; data: FaqTypesModel[] }>>();
(findPaginatedAdminFaqTypeRepository as unknown as { mockReturnValue: (value: typeof mockFindAll) => void }).mockReturnValue(mockFindAll);

const faqTypeRow = {
  faqTypeId: 1,
  faqTypeNameFa: 'نوع',
  faqTypeNameEn: 'Type',
  faqTypeSlug: 'general',
  faqTypeDescriptionFa: 'توضیح',
  faqTypeDescriptionEn: 'Description',
  faqTypeSortOrder: 1,
  faqTypeIsActive: true,
  faqTypeDeletedAt: null,
  faqTypeCreatedAt: new Date('2026-09-15T00:00:00.000Z'),
  faqTypeUpdatedAt: new Date('2026-09-15T00:00:00.000Z'),
} as unknown as FaqTypesModel;

describe('findPaginatedAdminFaqTypeQueryHandler', () => {
  beforeEach(() => {
    mockFindAll.mockReset();
    mockFindAll.mockResolvedValue({ count: 1, data: [faqTypeRow] });
  });

  it('passes pagination offsets and the search query', async () => {
    await findPaginatedAdminFaqTypeQueryHandler({ paginationPage: '2', paginationLimit: '10', faqTypeSearch: 'gen' }, 'en');

    expect(mockFindAll).toHaveBeenCalledWith({
      faqTypeSearchQuery: 'gen',
      faqTypePaginationSkip: 10,
      faqTypePaginationTake: 10,
    });
  });

  it('maps the admin shape without deletedAt', async () => {
    const result = await findPaginatedAdminFaqTypeQueryHandler({ paginationPage: '1', paginationLimit: '10' }, 'en');

    expect(result.count).toBe(1);
    expect(result.data[0]).not.toHaveProperty('faqTypeDeletedAt');
    expect(result.data[0]?.faqTypeId).toBe(1);
  });
});
