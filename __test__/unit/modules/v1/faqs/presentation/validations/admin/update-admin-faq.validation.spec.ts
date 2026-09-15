import { describe, expect, it } from '@jest/globals';

import { UpdateAdminFaqValidation } from '@/modules/v1/faqs/presentation/validations';

describe('UpdateAdminFaqValidation', () => {
  const validate = (body: unknown) => UpdateAdminFaqValidation('en').parse(body);

  it('accepts a partial update with a single field', () => {
    expect(validate({ faqId: 1, faqSortOrder: 2 })).toEqual({ faqId: 1, faqSortOrder: 2 });
  });

  it('accepts a full update', () => {
    const body = {
      faqId: 1,
      faqTypeId: 2,
      faqQuestionFa: 'سوال جدید',
      faqQuestionEn: 'New question',
      faqAnswerFa: 'پاسخ جدید',
      faqAnswerEn: 'New answer',
      faqSlug: 'new-slug',
      faqSortOrder: 3,
    };

    expect(validate(body)).toEqual(body);
  });

  it('rejects an update with no update field', () => {
    expect(() => validate({ faqId: 1 })).toThrow();
  });

  it('rejects invalid field types', () => {
    expect(() => validate({ faqId: 1, faqTypeId: '2' })).toThrow();
    expect(() => validate({ faqId: 1, faqSortOrder: '3' })).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ faqId: 1, faqSortOrder: 2, unknownField: 'x' })).toThrow();
  });
});
