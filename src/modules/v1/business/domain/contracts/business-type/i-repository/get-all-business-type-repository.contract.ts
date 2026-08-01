import type { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';

export type GetAllBusinessTypeRepositoryContract = () => Promise<BusinessTypesModel[]>;
