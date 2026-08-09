import type { UpdateBusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';
import type { EntityManager } from 'typeorm';

export type UpdateBusinessEmployeeSessionRepositoryContract = (businessEmployeeSessionData: UpdateBusinessEmployeeSessionCommand, manager?: EntityManager) => Promise<void>;
