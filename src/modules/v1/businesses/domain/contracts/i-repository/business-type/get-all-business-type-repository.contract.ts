import type { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/children';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type GetAllBusinessTypeRepositoryContract = (ctx?: TransactionContext) => Promise<BusinessTypesModel[]>;
