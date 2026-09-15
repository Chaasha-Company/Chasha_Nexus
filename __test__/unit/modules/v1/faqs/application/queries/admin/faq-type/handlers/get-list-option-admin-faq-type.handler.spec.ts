import { describe, expect, it } from '@jest/globals';

import { getListOptionAdminFaqTypeQueryHandler } from '@/modules/v1/faqs/application/queries/admin/faq-type/handlers/get-list-option-admin-faq-type.handler';

describe('getListOptionAdminFaqTypeQueryHandler', () => {
  it('returns all five searchable fields', async () => {
    const result = await getListOptionAdminFaqTypeQueryHandler('en');

    expect(result.faqTypeSearch.map((item) => item.faqTypeSearchField)).toEqual(['faqTypeNameFa', 'faqTypeNameEn', 'faqTypeSlug', 'faqTypeDescriptionFa', 'faqTypeDescriptionEn']);
  });
});
