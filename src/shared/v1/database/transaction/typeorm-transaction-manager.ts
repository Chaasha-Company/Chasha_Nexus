import type { ObjectLiteral } from 'typeorm';
import type { TransactionContext } from '@/shared/v1/domain/contracts/transaction.contract';
import type { TransactionManagerPort } from '@/shared/v1/domain/contracts/transaction-manager.contract';
import { AppDataSource } from '@/shared/v1/database/core';

export const createTypeOrmTransactionManager = (): TransactionManagerPort => {
  return async <T>(callback: (ctx: TransactionContext) => Promise<T>): Promise<T> => {
    return await AppDataSource.transaction(async (manager) => {
      const ctx: TransactionContext = {
        getRepository: <Entity extends ObjectLiteral>(entity: new (...args: unknown[]) => Entity) => {
          return manager.getRepository(entity);
        },
      };
      return callback(ctx);
    });
  };
};
