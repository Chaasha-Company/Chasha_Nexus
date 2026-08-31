import type { UpdateBusinessEmployeeSessionCommand } from '@/modules/v1/business-employee-sessions/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type UpdateBusinessEmployeeSessionRepositoryContract = (businessEmployeeSessionData: UpdateBusinessEmployeeSessionCommand, ctx?: TransactionContext) => Promise<void>;
