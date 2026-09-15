import { describe, expect, it } from '@jest/globals';

import { CreateAdminFaqValidation } from '@/modules/v1/faqs/presentation/validations';

describe('CreateAdminFaqValidation', () => {
  const validate = (body: unknown) => CreateAdminFaqValidation('en').parse(body);

  const validBody = {
    faqTypeId: 1,
    faqQuestionFa: 'سوال تستی',
    faqAnswerFa: 'پاسخ تستی',
    faqSlug: 'test-faq',
    faqSortOrder: 1,
  };

  it('accepts a valid body without optional English fields', () => {
    expect(validate(validBody)).toEqual(validBody);
  });

  it('accepts a valid body with optional English fields', () => {
    const body = { ...validBody, faqQuestionEn: 'Test question', faqAnswerEn: 'Test answer' };

    expect(validate(body)).toEqual(body);
  });

  it('rejects a body missing a required field', () => {
    const rest = { ...validBody } as Record<string, unknown>;
    delete rest.faqSlug;

    expect(() => validate(rest)).toThrow();
  });

  it('rejects invalid field types', () => {
    expect(() => validate({ ...validBody, faqTypeId: '1' })).toThrow();
    expect(() => validate({ ...validBody, faqSortOrder: '1' })).toThrow();
    expect(() => validate({ ...validBody, faqQuestionFa: 1 })).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ ...validBody, unknownField: 'x' })).toThrow();
  });
});
