import type { FindBusinessTypeBySlugQuery } from '@/modules/v1/business/application';
import type { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';

export type FindBusinessTypeBySlugRepositoryContract = (businessTypeData: FindBusinessTypeBySlugQuery) => Promise<BusinessTypesModel | null>;
