import type { EntityManager } from 'typeorm';

import { AppDataSource } from '@/shared/v1/database/core';

export const transactionManager = async <T>(callback: (manager: EntityManager) => Promise<T>): Promise<T> => {
  return await AppDataSource.transaction(async (manager) => {
    return await callback(manager);
  });
};
