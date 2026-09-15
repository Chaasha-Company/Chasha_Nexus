import { describe, expect, it } from '@jest/globals';

import { GetAllAdminFaqQueryValidation } from '@/modules/v1/faqs/presentation/validations';

describe('GetAllAdminFaqQueryValidation', () => {
  const validate = (query: unknown) => GetAllAdminFaqQueryValidation('en').parse(query);

  const validQuery = {
    paginationPage: '1',
    paginationLimit: '10',
  };

  it('accepts a valid query with optional search and type filter', () => {
    expect(validate({ ...validQuery, faqSearch: 'refund', faqTypeId: '2' })).toEqual({ ...validQuery, faqSearch: 'refund', faqTypeId: '2' });
  });

  it('rejects a query missing pagination', () => {
    expect(() => validate({ paginationLimit: '10' })).toThrow();
    expect(() => validate({ paginationPage: '1' })).toThrow();
  });

  it('rejects an invalid type filter', () => {
    expect(() => validate({ ...validQuery, faqTypeId: 'abc' })).toThrow();
  });
});
