import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { getListOptionAdminFaqQueryHandler } from '@/modules/v1/faqs/application/queries/admin/handlers/get-list-option-admin-faq.handler';

import { findAllAdminFaqTypeRepository } from '@/modules/v1/faqs/infrastructure';

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAllAdminFaqTypeRepository: jest.fn(),
}));

const mockFindAllTypes = jest.fn<() => Promise<FaqTypesModel[]>>();
(findAllAdminFaqTypeRepository as unknown as { mockReturnValue: (value: typeof mockFindAllTypes) => void }).mockReturnValue(mockFindAllTypes);

describe('getListOptionAdminFaqQueryHandler', () => {
  beforeEach(() => {
    mockFindAllTypes.mockReset();
  });

  it('returns search fields and type filters', async () => {
    mockFindAllTypes.mockResolvedValue([{ faqTypeId: 1, faqTypeNameFa: 'نوع', faqTypeNameEn: 'Type' }] as FaqTypesModel[]);

    const result = await getListOptionAdminFaqQueryHandler('en');

    expect(result.faqSearch.map((item) => item.faqSearchField)).toEqual(['faqQuestionFa', 'faqQuestionEn', 'faqAnswerFa', 'faqAnswerEn', 'faqSlug']);
    expect(result.faqFilters.faqType).toEqual([{ faqTypeId: 1, faqTypeLabels: { fa: 'نوع', en: 'Type' } }]);
  });
});
