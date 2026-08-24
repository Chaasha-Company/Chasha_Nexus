import { describe, expect, it } from '@jest/globals';

import { RemovePlatformAdminRolePermissionValidation } from '@/modules/v1/authorizations/presentation/validations';

describe('RemovePlatformAdminRolePermissionValidation', () => {
  const validate = (body: unknown) => RemovePlatformAdminRolePermissionValidation('en').parse(body);

  it('accepts a body containing the role and permission ids', () => {
    expect(validate({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionId: 'permission-uuid-1' })).toEqual({
      platformAdminRoleId: 'role-uuid-1',
      platformAdminPermissionId: 'permission-uuid-1',
    });
  });

  it('rejects an empty body', () => {
    expect(() => validate(undefined)).toThrow();
  });

  it('rejects a body missing the role id', () => {
    expect(() => validate({ platformAdminPermissionId: 'permission-uuid-1' })).toThrow();
  });

  it('rejects a body missing the permission id', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1' })).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1', platformAdminPermissionId: 'permission-uuid-1', unexpected: true })).toThrow();
  });
});
