import type { FindBusinessTypeByIdQuery } from '@/modules/v1/businesses/application';
import type { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';
import type { EntityManager } from 'typeorm';

export type FindBusinessTypeByIdRepositoryContract = (businessTypeData: FindBusinessTypeByIdQuery, manager?: EntityManager) => Promise<BusinessTypesModel | null>;
