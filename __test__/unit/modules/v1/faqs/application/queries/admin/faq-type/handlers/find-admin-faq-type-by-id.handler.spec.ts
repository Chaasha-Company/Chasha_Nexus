import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { findAdminFaqTypeByIdQueryHandler } from '@/modules/v1/faqs/application/queries/admin/faq-type/handlers/find-admin-faq-type-by-id.handler';

import { findAdminFaqTypeByIdRepository } from '@/modules/v1/faqs/infrastructure';

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAdminFaqTypeByIdRepository: jest.fn(),
}));

const mockFindById = jest.fn<(data: { faqTypeId: number }) => Promise<FaqTypesModel | null>>();
(findAdminFaqTypeByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindById) => void }).mockReturnValue(mockFindById);

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

describe('findAdminFaqTypeByIdQueryHandler', () => {
  beforeEach(() => {
    mockFindById.mockReset();
  });

  it('returns the detail without deletedAt', async () => {
    mockFindById.mockResolvedValue(faqTypeRow);

    const result = await findAdminFaqTypeByIdQueryHandler({ faqTypeId: 1 }, 'en');

    expect(mockFindById).toHaveBeenCalledWith({ faqTypeId: 1 });
    expect(result).not.toHaveProperty('faqTypeDeletedAt');
    expect(result.faqTypeId).toBe(1);
  });

  it('throws when the FAQ type does not exist', async () => {
    mockFindById.mockResolvedValue(null);

    await expect(findAdminFaqTypeByIdQueryHandler({ faqTypeId: 99 }, 'en')).rejects.toThrow();
  });
});
