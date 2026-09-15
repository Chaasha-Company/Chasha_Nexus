import type { DetailAdminFaqTypeRequestDTO } from '@/modules/v1/faqs/presentation';
import type { FindAdminFaqTypeByIdQueryResult } from '../results';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { findAdminFaqTypeByIdRepository } from '@/modules/v1/faqs/infrastructure';

export const findAdminFaqTypeByIdQueryHandler = async (faqTypeData: DetailAdminFaqTypeRequestDTO, lang: Language): FindAdminFaqTypeByIdQueryResult => {
  const faqType = await findAdminFaqTypeByIdRepository()({
    faqTypeId: faqTypeData.faqTypeId as number,
  });

  if (faqType === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        faqTypeId: [t(ValidationMessages, ValidationMessage.FAQ_TYPE_ID_NOT_FOUND, lang)],
      },
    });
  }

  const { faqTypeDeletedAt: _deletedAt, faqTypeFaqs: _faqs, ...result } = faqType!;

  return result;
};
