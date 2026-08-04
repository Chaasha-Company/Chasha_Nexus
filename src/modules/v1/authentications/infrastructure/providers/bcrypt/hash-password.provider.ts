import type { HashPasswordProviderContract } from '@/modules/v1/authentications/domain';
import bcrypt from 'bcryptjs';
import { EnvValueConfig } from '@/config/env';

export const hashPasswordProvider =
  (): HashPasswordProviderContract =>
  async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, EnvValueConfig.BCRYPT_SALT);
    return hashedPassword;
  };
