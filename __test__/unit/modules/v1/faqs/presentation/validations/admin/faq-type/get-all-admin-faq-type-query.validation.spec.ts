import { describe, expect, it } from '@jest/globals';

import { GetAllAdminFaqTypeQueryValidation } from '@/modules/v1/faqs/presentation/validations';

describe('GetAllAdminFaqTypeQueryValidation', () => {
  const validate = (query: unknown) => GetAllAdminFaqTypeQueryValidation('en').parse(query);

  const validQuery = {
    paginationPage: '1',
    paginationLimit: '10',
  };

  it('accepts a valid query with optional search', () => {
    expect(validate({ ...validQuery, faqTypeSearch: 'general' })).toEqual({ ...validQuery, faqTypeSearch: 'general' });
  });

  it('rejects a query missing pagination', () => {
    expect(() => validate({ paginationLimit: '10' })).toThrow();
    expect(() => validate({ paginationPage: '1' })).toThrow();
  });

  it('rejects non-numeric pagination values', () => {
    expect(() => validate({ ...validQuery, paginationPage: 'abc' })).toThrow();
  });
});
