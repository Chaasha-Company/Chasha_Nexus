import type { CacheInvalidationPort } from '@/shared/v1/domain/contracts/cache-invalidation.contract';
import type { TransactionManagerPort } from '@/shared/v1/domain/contracts/transaction-manager.contract';

let _transactionManager: TransactionManagerPort | null = null;
let _cacheInvalidation: CacheInvalidationPort | null = null;

export const setTransactionManager = (tm: TransactionManagerPort): void => {
  _transactionManager = tm;
};

export const setCacheInvalidation = (ci: CacheInvalidationPort): void => {
  _cacheInvalidation = ci;
};

export const transactionManager: TransactionManagerPort = async (callback) => {
  if (_transactionManager === null) {
    throw new Error('TransactionManager not initialized. Ensure composition root has run.');
  }
  return _transactionManager(callback);
};

export const invalidateCache: CacheInvalidationPort = async (cacheKeys) => {
  if (_cacheInvalidation === null) {
    throw new Error('CacheInvalidation not initialized. Ensure composition root has run.');
  }
  return _cacheInvalidation(cacheKeys);
};
