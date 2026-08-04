import type { PasswordCheckerProviderContract } from '@/modules/v1/authentications/domain';
import bcrypt from 'bcryptjs';

export const passwordCheckerProvider =
  (): PasswordCheckerProviderContract =>
  async (password: string, hashedPassword: string): Promise<boolean> => {
    const passwordIsCorrect = bcrypt.compare(password, hashedPassword);
    return passwordIsCorrect;
  };
