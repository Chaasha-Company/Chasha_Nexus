import type { FindBusinessTypeByIdQuery } from '@/modules/v1/businesses/application';
import type { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindBusinessTypeByIdRepositoryContract = (businessTypeData: FindBusinessTypeByIdQuery, ctx?: TransactionContext) => Promise<BusinessTypesModel | null>;
