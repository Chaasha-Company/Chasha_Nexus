import type { UpdateAdminFaqTypeCommand } from '@/modules/v1/faqs/application';
import { findAdminFaqTypeByIdRepository, findAdminFaqTypeBySlugRepository, updateAdminFaqTypeRepository } from '@/modules/v1/faqs/infrastructure';
import { throwNotFoundException, throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { invalidateCache } from '@/shared/v1/domain/contracts';

export const updateAdminFaqTypeCommandHandler = async (updateAdminFaqTypeData: UpdateAdminFaqTypeCommand, lang: Language): Promise<void> => {
  const faqTypeIsExist = await findAdminFaqTypeByIdRepository()({
    faqTypeId: updateAdminFaqTypeData.faqTypeId as number,
  });

  if (faqTypeIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        faqTypeId: [t(ValidationMessages, ValidationMessage.FAQ_TYPE_ID_NOT_FOUND, lang)],
      },
    });
  }

  if (updateAdminFaqTypeData.faqTypeSlug !== undefined && updateAdminFaqTypeData.faqTypeSlug !== faqTypeIsExist!.faqTypeSlug) {
    const faqTypeBySlug = await findAdminFaqTypeBySlugRepository()({
      faqTypeSlug: updateAdminFaqTypeData.faqTypeSlug,
    });

    if (faqTypeBySlug !== null) {
      throwRequestConflictException({
        message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
        details: {
          faqTypeSlug: [t(ValidationMessages, ValidationMessage.FAQ_TYPE_SLUG_ALREADY_EXISTS, lang)],
        },
      });
    }
  }

  const { faqTypeId, ...requestedData } = updateAdminFaqTypeData;

  const changedData = Object.fromEntries(Object.entries(requestedData).filter(([key, value]) => value !== undefined && value !== faqTypeIsExist![key as keyof typeof faqTypeIsExist]));

  if (Object.keys(changedData).length === 0) {
    return;
  }

  await updateAdminFaqTypeRepository()({
    faqTypeId,
    ...changedData,
  } as UpdateAdminFaqTypeCommand);

  await invalidateCache(['faq-types']);
};
