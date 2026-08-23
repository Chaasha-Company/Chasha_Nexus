import { describe, expect, it } from '@jest/globals';

import { CreatePlatformAdminRoleValidation } from '@/modules/v1/authorizations/presentation/validations';

describe('CreatePlatformAdminRoleValidation', () => {
  const validate = (body: unknown) => CreatePlatformAdminRoleValidation('en').parse(body);

  const validBody = {
    platformAdminRoleKey: 'manager',
    platformAdminRoleNameFa: 'مدیر',
    platformAdminRoleNameEn: 'Manager',
  };

  it('accepts a valid body with optional descriptions', () => {
    expect(
      validate({
        ...validBody,
        platformAdminRoleDescriptionFa: 'توضیحات',
        platformAdminRoleDescriptionEn: 'description',
      }),
    ).toEqual({
      platformAdminRoleKey: 'manager',
      platformAdminRoleNameFa: 'مدیر',
      platformAdminRoleNameEn: 'Manager',
      platformAdminRoleDescriptionFa: 'توضیحات',
      platformAdminRoleDescriptionEn: 'description',
    });
  });

  it('rejects a body missing the role key', () => {
    const { platformAdminRoleKey: _omitted, ...rest } = validBody;
    expect(() => validate(rest)).toThrow();
  });

  it('rejects a body missing the Persian name', () => {
    const { platformAdminRoleNameFa: _omitted, ...rest } = validBody;
    expect(() => validate(rest)).toThrow();
  });

  it('rejects a key longer than 100 characters', () => {
    expect(() => validate({ ...validBody, platformAdminRoleKey: 'k'.repeat(101) })).toThrow();
  });

  it('rejects unknown keys', () => {
    expect(() => validate({ ...validBody, unexpected: true })).toThrow();
  });
});
