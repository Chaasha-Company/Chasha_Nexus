import { describe, expect, it } from '@jest/globals';

import { DetailPlatformAdminRoleValidation } from '@/modules/v1/authorizations/presentation/validations';

describe('DetailPlatformAdminRoleValidation', () => {
  const validate = (body: unknown) => DetailPlatformAdminRoleValidation('en').parse(body);

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
