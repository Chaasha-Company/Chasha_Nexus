import type { FindFaqTypeBySlugQuery } from '@/modules/v1/faqs/application';
import type { FindFaqTypeBySlugRepositoryContract } from '@/modules/v1/faqs/domain';
import type { EntityManager } from 'typeorm';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs';
import { AppDataSource } from '@/shared/v1/database/core';

export const findFaqTypeBySlugRepository =
  (): FindFaqTypeBySlugRepositoryContract =>
  async (faqTypeData: FindFaqTypeBySlugQuery, manager?: EntityManager): Promise<null | FaqTypesModel> => {
    const faqTypeRepository = manager ? manager.getRepository(FaqTypesModel) : AppDataSource.getRepository(FaqTypesModel);

    return await faqTypeRepository.findOne({
      where: {
        faqTypeSlug: faqTypeData.faqTypeSlug,
      },
    });
  };
