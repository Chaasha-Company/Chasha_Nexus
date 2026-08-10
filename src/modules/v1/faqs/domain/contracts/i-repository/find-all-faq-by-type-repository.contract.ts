import type { FindAllFaqByTypeQuery } from '@/modules/v1/faqs/application';
import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import type { EntityManager } from 'typeorm';

export type FindAllFaqByTypeRepositoryContract = (faqData: FindAllFaqByTypeQuery, manager?: EntityManager) => Promise<null | FaqsModel[]>;
