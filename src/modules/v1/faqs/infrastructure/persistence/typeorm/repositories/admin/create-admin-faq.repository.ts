import type { CreateAdminFaqRepositoryContract } from '@/modules/v1/faqs/domain';
import type { CreateAdminFaqCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

import { AppDataSource } from '@/shared/v1/database/core';
import { FaqsModel } from '@/shared/v1/database/schema/faqs';

export const createAdminFaqRepository =
  (): CreateAdminFaqRepositoryContract =>
  async (createAdminFaqData: CreateAdminFaqCommand, ctx?: TransactionContext): Promise<FaqsModel> => {
    const faqRepository = ctx ? ctx.getRepository(FaqsModel) : AppDataSource.getRepository(FaqsModel);

    const faqData = faqRepository.create({
      faqTypeId: createAdminFaqData.faqTypeId,
      faqQuestionFa: createAdminFaqData.faqQuestionFa,
      faqQuestionEn: createAdminFaqData.faqQuestionEn ?? '',
      faqAnswerFa: createAdminFaqData.faqAnswerFa,
      faqAnswerEn: createAdminFaqData.faqAnswerEn ?? '',
      faqSlug: createAdminFaqData.faqSlug,
      faqSortOrder: createAdminFaqData.faqSortOrder,
    });

    const savedFaq = await faqRepository.save(faqData);

    return (await faqRepository.findOne({
      where: {
        faqId: savedFaq.faqId,
      },
      relations: {
        faqType: true,
      },
    })) as FaqsModel;
  };
