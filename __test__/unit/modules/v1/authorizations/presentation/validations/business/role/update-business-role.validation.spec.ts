import { describe, expect, it } from '@jest/globals';

import { UpdateBusinessRoleValidation } from '@/modules/v1/authorizations/presentation/validations';

describe('UpdateBusinessRoleValidation', () => {
  const validate = (body: unknown) => UpdateBusinessRoleValidation('en').parse(body);

  const validBody = {
    businessRoleId: '9f8c7d6e-5b4a-3210-0112-233445566779',
    businessRoleNameFa: 'مدیر',
  };

  it('accepts a valid update body', () => {
    expect(validate(validBody)).toEqual(validBody);
  });

  it('rejects a body without any update field', () => {
    expect(() =>
      validate({
        businessRoleId: '9f8c7d6e-5b4a-3210-0112-233445566779',
      }),
    ).toThrow();
  });

  it('rejects a body missing the role id', () => {
    expect(() =>
      validate({
        businessRoleNameFa: 'مدیر',
      }),
    ).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ ...validBody, unexpected: true })).toThrow();
  });
});
