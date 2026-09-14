import type { revokeAllBusinessEmployeeSessionByIdCommand } from '@/modules/v1/business-employee-sessions/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type RevokeAllBusinessEmployeeSessionByIdRepositoryContract = (businessEmployeeSessionData: revokeAllBusinessEmployeeSessionByIdCommand, ctx?: TransactionContext) => Promise<void>;
