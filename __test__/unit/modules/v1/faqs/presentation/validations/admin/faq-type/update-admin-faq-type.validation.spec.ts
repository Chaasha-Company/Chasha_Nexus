import { describe, expect, it } from '@jest/globals';

import { UpdateAdminFaqTypeValidation } from '@/modules/v1/faqs/presentation/validations';

describe('UpdateAdminFaqTypeValidation', () => {
  const validate = (body: unknown) => UpdateAdminFaqTypeValidation('en').parse(body);

  it('accepts a partial update with a single field', () => {
    expect(validate({ faqTypeId: 1, faqTypeSlug: 'new-slug' })).toEqual({ faqTypeId: 1, faqTypeSlug: 'new-slug' });
  });

  it('accepts a full update', () => {
    const body = {
      faqTypeId: 1,
      faqTypeNameFa: 'نام جدید',
      faqTypeNameEn: 'New name',
      faqTypeSlug: 'new-slug',
      faqTypeDescriptionFa: 'توضیح جدید',
      faqTypeDescriptionEn: 'New description',
    };

    expect(validate(body)).toEqual(body);
  });

  it('rejects an update with no update field', () => {
    expect(() => validate({ faqTypeId: 1 })).toThrow();
  });

  it('rejects invalid field types', () => {
    expect(() => validate({ faqTypeId: 1, faqTypeSlug: 1 })).toThrow();
    expect(() => validate({ faqTypeId: '1', faqTypeSlug: 'x' })).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ faqTypeId: 1, faqTypeSlug: 'x', unknownField: 'y' })).toThrow();
  });
});
