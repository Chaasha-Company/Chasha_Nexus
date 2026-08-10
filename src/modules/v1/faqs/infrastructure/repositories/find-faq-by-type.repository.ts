import type { FindAllFaqByTypeQuery } from '@/modules/v1/faqs/application';
import type { FindAllFaqByTypeRepositoryContract } from '@/modules/v1/faqs/domain';
import type { EntityManager } from 'typeorm';
import { FaqsModel } from '@/shared/v1/database/schema/faqs';
import { AppDataSource } from '@/shared/v1/database/core';

export const findAllFaqByTypeRepository =
  (): FindAllFaqByTypeRepositoryContract =>
  async (faqData: FindAllFaqByTypeQuery, manager?: EntityManager): Promise<null | FaqsModel[]> => {
    const faqRepository = manager ? manager.getRepository(FaqsModel) : AppDataSource.getRepository(FaqsModel);

    return await faqRepository.find({
      where: {
        faqTypeId: faqData.faqTypeId,
      },
      cache: true,
    });
  };
