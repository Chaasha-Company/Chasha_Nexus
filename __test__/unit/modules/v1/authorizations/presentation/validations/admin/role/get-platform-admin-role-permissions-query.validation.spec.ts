import { describe, expect, it } from '@jest/globals';

import { GetPlatformAdminRolePermissionsQueryValidation } from '@/modules/v1/authorizations/presentation/validations';

describe('GetPlatformAdminRolePermissionsQueryValidation', () => {
  const validate = (query: unknown) => GetPlatformAdminRolePermissionsQueryValidation('en').parse(query);

  it('accepts a query containing the role id', () => {
    expect(validate({ platformAdminRoleId: 'role-uuid-1' })).toEqual({ platformAdminRoleId: 'role-uuid-1' });
  });

  it('rejects an empty query', () => {
    expect(() => validate(undefined)).toThrow();
  });

  it('rejects a query missing the role id', () => {
    expect(() => validate({})).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1', unexpected: true })).toThrow();
  });
});
