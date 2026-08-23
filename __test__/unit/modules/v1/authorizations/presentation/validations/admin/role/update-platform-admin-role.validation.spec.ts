import { describe, expect, it } from '@jest/globals';

import { UpdatePlatformAdminRoleValidation } from '@/modules/v1/authorizations/presentation/validations';

describe('UpdatePlatformAdminRoleValidation', () => {
  const validate = (body: unknown) => UpdatePlatformAdminRoleValidation('en').parse(body);

  it('accepts an update with the role id and one editable field', () => {
    expect(validate({ platformAdminRoleId: 'role-uuid-1', platformAdminRoleNameEn: 'Renamed' })).toEqual({
      platformAdminRoleId: 'role-uuid-1',
      platformAdminRoleNameEn: 'Renamed',
    });
  });

  it('rejects a body containing only the role id (no editable fields)', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1' })).toThrow();
  });

  it('rejects a body missing the role id', () => {
    expect(() => validate({ platformAdminRoleNameEn: 'Renamed' })).toThrow();
  });

  it('rejects a name longer than 255 characters', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1', platformAdminRoleNameFa: 'n'.repeat(256) })).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ platformAdminRoleId: 'role-uuid-1', platformAdminRoleKey: 'hacked' })).toThrow();
  });
});
