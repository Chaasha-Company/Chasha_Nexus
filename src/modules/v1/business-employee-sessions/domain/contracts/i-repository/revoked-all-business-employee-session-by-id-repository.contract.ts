import type { RevokedAllBusinessEmployeeSessionByIdCommand } from '@/modules/v1/business-employee-sessions/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type RevokedAllBusinessEmployeeSessionByIdRepositoryContract = (businessEmployeeSessionData: RevokedAllBusinessEmployeeSessionByIdCommand, ctx?: TransactionContext) => Promise<void>;
