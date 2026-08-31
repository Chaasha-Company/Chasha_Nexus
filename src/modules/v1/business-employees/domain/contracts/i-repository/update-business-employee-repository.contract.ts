import type { UpdateBusinessEmployeeCommand } from '@/modules/v1/business-employees/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type UpdateBusinessEmployeeRepositoryContract = (businessEmployeeData: UpdateBusinessEmployeeCommand, ctx?: TransactionContext) => Promise<void>;
