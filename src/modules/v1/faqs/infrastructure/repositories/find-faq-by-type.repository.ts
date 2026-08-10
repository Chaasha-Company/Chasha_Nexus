import type { FindFaqByTypeQuery } from '@/modules/v1/faqs/application';
import type { FindFaqByTypeRepositoryContract } from '@/modules/v1/faqs/domain';
import type { EntityManager } from 'typeorm';
import { FaqsModel } from '@/shared/v1/database/schema/faqs';
import { AppDataSource } from '@/shared/v1/database/core';

export const findFaqByTypeRepository =
  (): FindFaqByTypeRepositoryContract =>
  async (faqData: FindFaqByTypeQuery, manager?: EntityManager): Promise<null | FaqsModel> => {
    const faqRepository = manager ? manager.getRepository(FaqsModel) : AppDataSource.getRepository(FaqsModel);

    return await faqRepository.findOne({
      where: {
        faqTypeId: faqData.faqTypeId,
      },
    });
  };
