import type { UpdateBusinessEmployeeCommand } from '@/modules/v1/business-employees/application';

export type UpdateBusinessEmployeeRepositoryContract = (businessEmployeeData: UpdateBusinessEmployeeCommand) => Promise<void>;
