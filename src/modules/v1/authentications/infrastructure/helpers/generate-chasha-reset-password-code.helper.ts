import crypto from 'crypto';

export const generateChashaResetPasswordCodeHelper = (): string => {
  const prefix = '@CHASHA_';
  const random = crypto.randomBytes(7).toString('hex').toUpperCase();

  return `${prefix}${random}`;
};
