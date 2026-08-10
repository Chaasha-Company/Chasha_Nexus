import type { FindFaqByTypeQuery } from '@/modules/v1/faqs/application';
import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import type { EntityManager } from 'typeorm';

export type FindFaqByTypeRepositoryContract = (faqData: FindFaqByTypeQuery, manager?: EntityManager) => Promise<null | FaqsModel>;
