import { describe, expect, it } from '@jest/globals';

import { DetailAdminFaqValidation } from '@/modules/v1/faqs/presentation/validations';
import { DeleteAdminFaqValidation } from '@/modules/v1/faqs/presentation/validations';

describe('DetailAdminFaqValidation', () => {
  it('accepts a numeric id', () => {
    expect(DetailAdminFaqValidation('en').parse({ faqId: 1 })).toEqual({ faqId: 1 });
  });

  it('rejects a missing or invalid id', () => {
    expect(() => DetailAdminFaqValidation('en').parse({})).toThrow();
    expect(() => DetailAdminFaqValidation('en').parse({ faqId: '1' })).toThrow();
  });
});

describe('DeleteAdminFaqValidation', () => {
  it('accepts a numeric id', () => {
    expect(DeleteAdminFaqValidation('en').parse({ faqId: 1 })).toEqual({ faqId: 1 });
  });

  it('rejects a missing or invalid id', () => {
    expect(() => DeleteAdminFaqValidation('en').parse({})).toThrow();
    expect(() => DeleteAdminFaqValidation('en').parse({ faqId: '1' })).toThrow();
  });
});
