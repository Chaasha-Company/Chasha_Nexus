import type { CountBusinessRoleEmployeesQuery } from '@/modules/v1/businesses/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type CountBusinessRoleEmployeesRepositoryContract = (businessRoleData: CountBusinessRoleEmployeesQuery, ctx?: TransactionContext) => Promise<number>;
