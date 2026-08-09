import type { FindBusinessTypeBySlugQuery } from '@/modules/v1/businesses/application';
import type { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';
import type { EntityManager } from 'typeorm';

export type FindBusinessTypeBySlugRepositoryContract = (businessTypeData: FindBusinessTypeBySlugQuery, manager?: EntityManager) => Promise<BusinessTypesModel | null>;
