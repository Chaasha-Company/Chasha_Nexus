import type { ObjectLiteral, Repository } from 'typeorm';

export interface TransactionContext {
  getRepository<Entity extends ObjectLiteral>(entity: new (...args: unknown[]) => Entity): Repository<Entity>;
}
