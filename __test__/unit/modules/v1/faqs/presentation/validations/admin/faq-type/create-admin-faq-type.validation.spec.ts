import { describe, expect, it } from '@jest/globals';

import { CreateAdminFaqTypeValidation } from '@/modules/v1/faqs/presentation/validations';

describe('CreateAdminFaqTypeValidation', () => {
  const validate = (body: unknown) => CreateAdminFaqTypeValidation('en').parse(body);

  const validBody = {
    faqTypeNameFa: 'نوع تستی',
    faqTypeSlug: 'test-type',
    faqTypeDescriptionFa: 'توضیح تستی',
  };

  it('accepts a valid body without optional English fields', () => {
    expect(validate(validBody)).toEqual(validBody);
  });

  it('accepts a valid body with optional English fields', () => {
    const body = { ...validBody, faqTypeNameEn: 'Test type', faqTypeDescriptionEn: 'Test description' };

    expect(validate(body)).toEqual(body);
  });

  it('rejects a body missing a required field', () => {
    const rest = { ...validBody } as Record<string, unknown>;
    delete rest.faqTypeSlug;

    expect(() => validate(rest)).toThrow();
  });

  it('rejects invalid field types', () => {
    expect(() => validate({ ...validBody, faqTypeNameFa: 1 })).toThrow();
    expect(() => validate({ ...validBody, faqTypeSlug: 1 })).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ ...validBody, unknownField: 'x' })).toThrow();
  });
});
