import type { TransactionContext } from './transaction.contract';

export type TransactionManagerPort = <T>(callback: (ctx: TransactionContext) => Promise<T>) => Promise<T>;
