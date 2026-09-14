import { describe, expect, it } from '@jest/globals';

import { CreateBusinessRoleValidation } from '@/modules/v1/authorizations/presentation/validations';

describe('CreateBusinessRoleValidation', () => {
  const validate = (body: unknown) => CreateBusinessRoleValidation('en').parse(body);

  const validBody = {
    businessRoleKey: 'manager',
    businessRoleNameFa: 'مدیر',
    businessRoleNameEn: 'Manager',
  };

  it('accepts a valid body with optional descriptions', () => {
    expect(
      validate({
        ...validBody,
        businessRoleDescriptionFa: 'توضیحات',
        businessRoleDescriptionEn: 'description',
      }),
    ).toEqual({
      businessRoleKey: 'manager',
      businessRoleNameFa: 'مدیر',
      businessRoleNameEn: 'Manager',
      businessRoleDescriptionFa: 'توضیحات',
      businessRoleDescriptionEn: 'description',
    });
  });

  it('rejects a body missing the role key', () => {
    const rest = { ...validBody };
    delete rest.businessRoleKey;
    expect(() => validate(rest)).toThrow();
  });

  it('rejects a body missing the Persian name', () => {
    const rest = { ...validBody };
    delete rest.businessRoleNameFa;
    expect(() => validate(rest)).toThrow();
  });

  it('rejects a key longer than 100 characters', () => {
    expect(() => validate({ ...validBody, businessRoleKey: 'k'.repeat(101) })).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ ...validBody, unexpected: true })).toThrow();
  });
});
