import crypto from 'crypto';

export const generateChashaEarlyAccessRequestCodeHelper = (): string => {
  const prefix = '@CHASHA_';
  const random = crypto.randomInt(100000, 1000000);

  return `${prefix}${random}`;
};
