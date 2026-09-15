import type { FaqsModel } from '@/shared/v1/database/schema/faqs';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { findAllAdminFaqQueryHandler } from '@/modules/v1/faqs/application/queries/admin/handlers/find-all-admin-faq.handler';

import { findAllAdminFaqRepository } from '@/modules/v1/faqs/infrastructure';

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAllAdminFaqRepository: jest.fn(),
}));

const mockFindAll = jest.fn<(data: { faqTypeIdQuery?: number; faqSearchQuery?: string; faqPaginationSkip: number; faqPaginationTake: number }) => Promise<{ count: number; data: FaqsModel[] }>>();
(findAllAdminFaqRepository as unknown as { mockReturnValue: (value: typeof mockFindAll) => void }).mockReturnValue(mockFindAll);

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
  },
  faqCreatedAt: new Date('2026-09-15T00:00:00.000Z'),
  faqUpdatedAt: new Date('2026-09-15T00:00:00.000Z'),
} as unknown as FaqsModel;

describe('findAllAdminFaqQueryHandler', () => {
  beforeEach(() => {
    mockFindAll.mockReset();
    mockFindAll.mockResolvedValue({ count: 1, data: [faqRow] });
  });

  it('passes pagination offsets and coerces the type filter', async () => {
    await findAllAdminFaqQueryHandler({ paginationPage: '2', paginationLimit: '10', faqTypeId: '2' }, 'en');

    expect(mockFindAll).toHaveBeenCalledWith({
      faqSearchQuery: undefined,
      faqTypeIdQuery: 2,
      faqPaginationSkip: 10,
      faqPaginationTake: 10,
    });
  });

  it('maps the admin shape with relation and without deletedAt', async () => {
    const result = await findAllAdminFaqQueryHandler({ paginationPage: '1', paginationLimit: '10' }, 'en');

    expect(result.count).toBe(1);
    expect(result.data[0]).not.toHaveProperty('faqDeletedAt');
    expect(result.data[0]?.faqType).not.toHaveProperty('faqTypeDeletedAt');
    expect(result.data[0]?.faqId).toBe(1);
    expect(result.data[0]?.faqType.faqTypeId).toBe(2);
  });
});
