import { describe, expect, it } from '@jest/globals';

import { ReplacePlatformAdminRolePermissionsValidation } from '@/modules/v1/authorizations/presentation/validations';

describe('ReplacePlatformAdminRolePermissionsValidation', () => {
  const validate = (body: unknown) => ReplacePlatformAdminRolePermissionsValidation('en').parse(body);

  it('accepts a body with the role id and a permission id array', () => {
    expect(validate({ platformAdminRoleId: 'role-uuid-1', permissionIds: ['permission-uuid-1', 'permission-uuid-2'] })).toEqual({
      platformAdminRoleId: 'role-uuid-1',
      permissionIds: ['permission-uuid-1', 'permission-uuid-2'],
    });
  });

  it('accepts an empty permission ids array', () => {
    expect(validate({ platformAdminRoleId: 'role-uuid-1', permissionIds: [] })).toEqual({ platformAdminRoleId: 'role-uuid-1', permissionIds: [] });
  });

  it('rejects an empty body', () => {
    expect(() => validate(undefined)).toThrow();
  });

  it('rejects a body missing the role id', () => {
    expect(() => validate({ permissionIds: [] })).toThrow();
  });

  it('rejects a body missing the permission ids', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1' })).toThrow();
  });

  it('rejects non-array permission ids', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1', permissionIds: 'permission-uuid-1' })).toThrow();
  });

  it('rejects duplicate permission ids', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1', permissionIds: ['permission-uuid-1', 'permission-uuid-1'] })).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1', permissionIds: [], unexpected: true })).toThrow();
  });
});
