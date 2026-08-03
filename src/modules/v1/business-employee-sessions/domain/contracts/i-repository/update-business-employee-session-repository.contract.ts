import type { UpdateBusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';

export type UpdateBusinessEmployeeSessionRepositoryContract = (businessEmployeeSessionData: UpdateBusinessEmployeeSessionCommand) => Promise<void>;
