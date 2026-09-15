import type { CreateAdminFaqTypeCommand, CreateAdminFaqTypeCommandResult } from '@/modules/v1/faqs/application';
import { createAdminFaqTypeRepository, findAdminFaqTypeBySlugRepository } from '@/modules/v1/faqs/infrastructure';
import { throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { invalidateCache } from '@/shared/v1/domain/contracts';

export const createAdminFaqTypeCommandHandler = async (createAdminFaqTypeData: CreateAdminFaqTypeCommand, lang: Language): CreateAdminFaqTypeCommandResult => {
  const faqTypeBySlug = await findAdminFaqTypeBySlugRepository()({
    faqTypeSlug: createAdminFaqTypeData.faqTypeSlug,
  });

  if (faqTypeBySlug !== null) {
    throwRequestConflictException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        faqTypeSlug: [t(ValidationMessages, ValidationMessage.FAQ_TYPE_SLUG_ALREADY_EXISTS, lang)],
      },
    });
  }

  const createdFaqType = await createAdminFaqTypeRepository()(createAdminFaqTypeData);

  await invalidateCache(['faq-types']);

  const { faqTypeDeletedAt: _deletedAt, faqTypeFaqs: _faqs, ...result } = createdFaqType;

  return result;
};
