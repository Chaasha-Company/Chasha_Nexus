import type { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';
import type { EntityManager } from 'typeorm';

export type GetAllBusinessTypeRepositoryContract = (manager?: EntityManager) => Promise<BusinessTypesModel[]>;
