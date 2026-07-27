import { type Enforcer, newEnforcer } from 'casbin';
import path from 'path';
import TypeORMAdapter from 'typeorm-adapter';
import { EnvValueConfig } from '@/config/env';
import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';

let enforcer: null | Enforcer;
export const casbinAuthInitConfig = async (): Promise<void> => {
  const isProduction = EnvValueConfig.NODE_ENV === 'production';
  try {
    if (!AppDataSource.isInitialized) {
      loggerConfig.error('Data Source is not initialized. Run initialize() first.');
      return;
    }
    // @ts-expect-error - Module exports structure mismatch
    const adapter = await TypeORMAdapter.default.newAdapter({ connection: AppDataSource });
    const modulePath = path.join(process.cwd(), isProduction ? '' : 'src', 'infrastructure', 'auth-system', 'casbin', 'config', 'model.conf');
    enforcer = await newEnforcer(modulePath, adapter);
    await enforcer.loadPolicy();
    loggerConfig.info('Casbin Auth System loaded successfully.');
  } catch (error: unknown) {
    loggerConfig.error(`Casbin Init lost with ${error}`);
  }
};

export const getCasbinAuthEnforcer = (): Enforcer => enforcer as Enforcer;
