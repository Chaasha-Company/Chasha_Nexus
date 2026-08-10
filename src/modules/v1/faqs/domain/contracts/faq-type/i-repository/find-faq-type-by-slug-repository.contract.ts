import type { FindFaqTypeBySlugQuery } from '@/modules/v1/faqs/application';
import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs';
import type { EntityManager } from 'typeorm';

export type FindFaqTypeBySlugRepositoryContract = (faqTypeData: FindFaqTypeBySlugQuery, manager?: EntityManager) => Promise<null | FaqTypesModel>;
