import type { UpdateBusinessEmployeeCommand } from '@/modules/v1/business-employees/application';
import type { EntityManager } from 'typeorm';

export type UpdateBusinessEmployeeRepositoryContract = (businessEmployeeData: UpdateBusinessEmployeeCommand, manager?: EntityManager) => Promise<void>;
