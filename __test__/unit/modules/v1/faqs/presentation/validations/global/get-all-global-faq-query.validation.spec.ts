import { describe, expect, it } from '@jest/globals';

import { GetAllGlobalFaqQueryValidation } from '@/modules/v1/faqs/presentation/validations';

describe('GetAllGlobalFaqQueryValidation', () => {
  const validate = (query: unknown) => GetAllGlobalFaqQueryValidation('en').parse(query);

  const validQuery = {
    faqType: 'landing',
    paginationPage: '1',
    paginationLimit: '10',
  };

  it('accepts a valid query with optional search', () => {
    expect(validate({ ...validQuery, faqSearch: 'refund' })).toEqual({
      faqType: 'landing',
      faqSearch: 'refund',
      paginationPage: '1',
      paginationLimit: '10',
    });
  });

  it('rejects a query missing the FAQ type', () => {
    const rest = { ...validQuery };
    delete rest.faqType;
    expect(() => validate(rest)).toThrow();
  });

  it('rejects an invalid FAQ type', () => {
    expect(() => validate({ ...validQuery, faqType: 'invalid' })).toThrow();
  });

  it('rejects a query missing pagination page', () => {
    const rest = { ...validQuery };
    delete rest.paginationPage;
    expect(() => validate(rest)).toThrow();
  });

  it('rejects a query missing pagination limit', () => {
    const rest = { ...validQuery };
    delete rest.paginationLimit;
    expect(() => validate(rest)).toThrow();
  });

  it('rejects non-numeric pagination values', () => {
    expect(() => validate({ ...validQuery, paginationPage: 'abc' })).toThrow();
    expect(() => validate({ ...validQuery, paginationLimit: 'abc' })).toThrow();
  });

  it('rejects zero or negative pagination values', () => {
    expect(() => validate({ ...validQuery, paginationPage: '0' })).toThrow();
    expect(() => validate({ ...validQuery, paginationLimit: '0' })).toThrow();
    expect(() => validate({ ...validQuery, paginationPage: '-1' })).toThrow();
    expect(() => validate({ ...validQuery, paginationLimit: '-1' })).toThrow();
  });

  it('rejects unknown query keys', () => {
    expect(() => validate({ ...validQuery, unexpected: true })).toThrow();
  });
});
