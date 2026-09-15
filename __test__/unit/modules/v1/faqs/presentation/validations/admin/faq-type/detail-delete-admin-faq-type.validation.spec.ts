import { describe, expect, it } from '@jest/globals';

import { DetailAdminFaqTypeValidation } from '@/modules/v1/faqs/presentation/validations';
import { DeleteAdminFaqTypeValidation } from '@/modules/v1/faqs/presentation/validations';

describe('DetailAdminFaqTypeValidation', () => {
  it('accepts a numeric id', () => {
    expect(DetailAdminFaqTypeValidation('en').parse({ faqTypeId: 1 })).toEqual({ faqTypeId: 1 });
  });

  it('rejects a missing or invalid id', () => {
    expect(() => DetailAdminFaqTypeValidation('en').parse({})).toThrow();
    expect(() => DetailAdminFaqTypeValidation('en').parse({ faqTypeId: '1' })).toThrow();
  });
});

describe('DeleteAdminFaqTypeValidation', () => {
  it('accepts a numeric id', () => {
    expect(DeleteAdminFaqTypeValidation('en').parse({ faqTypeId: 1 })).toEqual({ faqTypeId: 1 });
  });

  it('rejects a missing or invalid id', () => {
    expect(() => DeleteAdminFaqTypeValidation('en').parse({})).toThrow();
    expect(() => DeleteAdminFaqTypeValidation('en').parse({ faqTypeId: '1' })).toThrow();
  });
});
