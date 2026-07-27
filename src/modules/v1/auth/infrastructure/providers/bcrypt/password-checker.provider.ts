import type { PasswordCheckerProviderContract } from '@/modules/v1/auth/domain';
import bcrypt from 'bcryptjs';

export const passwordCheckerProvider =
  (): PasswordCheckerProviderContract =>
  async (password: string, hashedPassword: string): Promise<boolean> => {
    const passwordIsCorrect = bcrypt.compare(password, hashedPassword);
    return passwordIsCorrect;
  };
