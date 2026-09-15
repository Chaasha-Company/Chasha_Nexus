import type { DetailAdminFaqRequestDTO } from '@/modules/v1/faqs/presentation';
import type { FindAdminFaqByIdQueryResult } from '../results';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { findAdminFaqByIdRepository } from '@/modules/v1/faqs/infrastructure';

export const findAdminFaqByIdQueryHandler = async (faqData: DetailAdminFaqRequestDTO, lang: Language): FindAdminFaqByIdQueryResult => {
  const faq = await findAdminFaqByIdRepository()({
    faqId: faqData.faqId as number,
  });

  if (faq === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        faqId: [t(ValidationMessages, ValidationMessage.FAQ_ID_NOT_FOUND, lang)],
      },
    });
  }

  const { faqDeletedAt: _deletedAt, faqType: faqTypeData, ...result } = faq!;
  const { faqTypeDeletedAt: _faqTypeDeletedAt, faqTypeFaqs: _faqTypeFaqs, faqTypeCreatedAt: _faqTypeCreatedAt, faqTypeUpdatedAt: _faqTypeUpdatedAt, ...faqTypeResult } = faqTypeData;

  return {
    ...result,
    faqType: faqTypeResult,
  };
};
