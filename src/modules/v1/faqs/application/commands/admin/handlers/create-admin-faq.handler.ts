import type { CreateAdminFaqCommand, CreateAdminFaqCommandResult } from '@/modules/v1/faqs/application';
import { findAdminFaqBySlugRepository, createAdminFaqRepository, findAdminFaqTypeByIdRepository } from '@/modules/v1/faqs/infrastructure';
import { throwNotFoundException, throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { invalidateCache } from '@/shared/v1/domain/contracts';

export const createAdminFaqCommandHandler = async (createAdminFaqData: CreateAdminFaqCommand, lang: Language): CreateAdminFaqCommandResult => {
  const faqType = await findAdminFaqTypeByIdRepository()({
    faqTypeId: createAdminFaqData.faqTypeId,
  });

  if (faqType === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        faqTypeId: [t(ValidationMessages, ValidationMessage.FAQ_TYPE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const faqBySlug = await findAdminFaqBySlugRepository()({
    faqSlug: createAdminFaqData.faqSlug,
  });

  if (faqBySlug !== null) {
    throwRequestConflictException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        faqSlug: [t(ValidationMessages, ValidationMessage.FAQ_SLUG_ALREADY_EXISTS, lang)],
      },
    });
  }

  const createdFaq = await createAdminFaqRepository()({
    faqTypeId: createAdminFaqData.faqTypeId,
    faqQuestionFa: createAdminFaqData.faqQuestionFa,
    faqQuestionEn: createAdminFaqData.faqQuestionEn,
    faqAnswerFa: createAdminFaqData.faqAnswerFa,
    faqAnswerEn: createAdminFaqData.faqAnswerEn,
    faqSlug: createAdminFaqData.faqSlug,
    faqSortOrder: createAdminFaqData.faqSortOrder,
  });

  await invalidateCache(['faqs']);

  const { faqDeletedAt: _deletedAt, ...result } = createdFaq;
  const { faqTypeDeletedAt: _faqTypeDeletedAt, faqTypeFaqs: _faqTypeFaqs, faqTypeCreatedAt: _faqTypeCreatedAt, faqTypeUpdatedAt: _faqTypeUpdatedAt, ...faqTypeResult } = createdFaq.faqType;

  return {
    ...result,
    faqType: faqTypeResult,
  };
};
