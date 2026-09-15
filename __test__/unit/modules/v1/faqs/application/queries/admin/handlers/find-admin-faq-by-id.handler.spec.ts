import type { FaqsModel } from '@/shared/v1/database/schema/faqs';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { findAdminFaqByIdQueryHandler } from '@/modules/v1/faqs/application/queries/admin/handlers/find-admin-faq-by-id.handler';

import { findAdminFaqByIdRepository } from '@/modules/v1/faqs/infrastructure';

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAdminFaqByIdRepository: jest.fn(),
}));

const mockFindById = jest.fn<(data: { faqId: number }) => Promise<FaqsModel | null>>();
(findAdminFaqByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindById) => void }).mockReturnValue(mockFindById);

const faqRow = {
  faqId: 1,
  faqTypeId: 2,
  faqQuestionFa: 'سوال',
  faqQuestionEn: 'Question',
  faqAnswerFa: 'پاسخ',
  faqAnswerEn: 'Answer',
  faqSlug: 'faq-one',
  faqSortOrder: 1,
  faqIsActive: true,
  faqDeletedAt: null,
  faqType: {
    faqTypeId: 2,
    faqTypeNameFa: 'نوع',
    faqTypeNameEn: 'Type',
    faqTypeSlug: 'landing',
    faqTypeSortOrder: 1,
    faqTypeIsActive: true,
    faqTypeDeletedAt: null,
    faqTypeFaqs: [],
    faqTypeCreatedAt: new Date('2026-09-15T00:00:00.000Z'),
    faqTypeUpdatedAt: new Date('2026-09-15T00:00:00.000Z'),
  },
  faqCreatedAt: new Date('2026-09-15T00:00:00.000Z'),
  faqUpdatedAt: new Date('2026-09-15T00:00:00.000Z'),
} as unknown as FaqsModel;

describe('findAdminFaqByIdQueryHandler', () => {
  beforeEach(() => {
    mockFindById.mockReset();
  });

  it('returns the detail without deletedAt on FAQ or relation', async () => {
    mockFindById.mockResolvedValue(faqRow);

    const result = await findAdminFaqByIdQueryHandler({ faqId: 1 }, 'en');

    expect(mockFindById).toHaveBeenCalledWith({ faqId: 1 });
    expect(result).not.toHaveProperty('faqDeletedAt');
    expect(result.faqType).not.toHaveProperty('faqTypeDeletedAt');
    expect(result.faqId).toBe(1);
  });

  it('throws when the FAQ does not exist', async () => {
    mockFindById.mockResolvedValue(null);

    await expect(findAdminFaqByIdQueryHandler({ faqId: 99 }, 'en')).rejects.toThrow();
  });
});
