import { randomUUID } from 'crypto';

export const createUniqueRequestIdHelper = (prefix: string): string => {
  const uuid = randomUUID();
  return `@${prefix}_RID_${uuid}`;
};
