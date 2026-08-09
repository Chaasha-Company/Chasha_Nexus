import type { RevokedAllBusinessEmployeeSessionByIdCommand } from '@/modules/v1/business-employee-sessions/application';
import type { EntityManager } from 'typeorm';

export type RevokedAllBusinessEmployeeSessionByIdRepositoryContract = (businessEmployeeSessionData: RevokedAllBusinessEmployeeSessionByIdCommand, manager?: EntityManager) => Promise<void>;
