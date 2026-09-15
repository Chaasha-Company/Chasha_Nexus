import type { UpdateAdminFaqCommand } from '@/modules/v1/faqs/application';
import { findAdminFaqByIdRepository, findAdminFaqBySlugRepository, findAdminFaqTypeByIdRepository, updateAdminFaqRepository } from '@/modules/v1/faqs/infrastructure';
import { throwNotFoundException, throwRequestConflictException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { invalidateCache } from '@/shared/v1/domain/contracts';

export const updateAdminFaqCommandHandler = async (updateAdminFaqData: UpdateAdminFaqCommand, lang: Language): Promise<void> => {
  const faqIsExist = await findAdminFaqByIdRepository()({
    faqId: updateAdminFaqData.faqId as number,
  });

  if (faqIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        faqId: [t(ValidationMessages, ValidationMessage.FAQ_ID_NOT_FOUND, lang)],
      },
    });
  }

  if (updateAdminFaqData.faqTypeId !== undefined && updateAdminFaqData.faqTypeId !== faqIsExist!.faqTypeId) {
    const faqType = await findAdminFaqTypeByIdRepository()({
      faqTypeId: updateAdminFaqData.faqTypeId,
    });

    if (faqType === null) {
      throwNotFoundException({
        message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
        details: {
          faqTypeId: [t(ValidationMessages, ValidationMessage.FAQ_TYPE_ID_NOT_FOUND, lang)],
        },
      });
    }
  }

  if (updateAdminFaqData.faqSlug !== undefined && updateAdminFaqData.faqSlug !== faqIsExist!.faqSlug) {
    const faqBySlug = await findAdminFaqBySlugRepository()({
      faqSlug: updateAdminFaqData.faqSlug,
    });

    if (faqBySlug !== null) {
      throwRequestConflictException({
        message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
        details: {
          faqSlug: [t(ValidationMessages, ValidationMessage.FAQ_SLUG_ALREADY_EXISTS, lang)],
        },
      });
    }
  }

  const { faqId, ...requestedData } = updateAdminFaqData;

  const changedData = Object.fromEntries(Object.entries(requestedData).filter(([key, value]) => value !== undefined && value !== faqIsExist![key as keyof typeof faqIsExist]));

  if (Object.keys(changedData).length === 0) {
    return;
  }

  await updateAdminFaqRepository()({
    faqId,
    ...changedData,
  } as UpdateAdminFaqCommand);

  await invalidateCache(['faqs']);
};
