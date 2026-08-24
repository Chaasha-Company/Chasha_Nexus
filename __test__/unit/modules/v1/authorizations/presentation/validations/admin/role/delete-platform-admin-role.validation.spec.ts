import { describe, expect, it } from '@jest/globals';

import { DeletePlatformAdminRoleValidation } from '@/modules/v1/authorizations/presentation/validations';

describe('DeletePlatformAdminRoleValidation', () => {
  const validate = (body: unknown) => DeletePlatformAdminRoleValidation('en').parse(body);

  it('accepts a body containing the role id', () => {
    expect(validate({ platformAdminRoleId: 'role-uuid-1' })).toEqual({ platformAdminRoleId: 'role-uuid-1' });
  });

  it('rejects an empty body', () => {
    expect(() => validate(undefined)).toThrow();
  });

  it('rejects a body missing the role id', () => {
    expect(() => validate({})).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1', unexpected: true })).toThrow();
  });
});
