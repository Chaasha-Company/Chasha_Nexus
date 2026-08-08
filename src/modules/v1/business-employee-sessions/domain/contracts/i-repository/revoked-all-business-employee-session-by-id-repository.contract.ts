import type { RevokedAllBusinessEmployeeSessionByIdCommand } from '@/modules/v1/business-employee-sessions/application';

export type RevokedAllBusinessEmployeeSessionByIdRepositoryContract = (businessEmployeeSessionData: RevokedAllBusinessEmployeeSessionByIdCommand) => Promise<void>;
