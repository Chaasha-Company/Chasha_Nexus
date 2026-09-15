import type { DeleteAdminFaqCommand } from '@/modules/v1/faqs/application';
import { deleteAdminFaqRepository, findAdminFaqByIdRepository } from '@/modules/v1/faqs/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { invalidateCache } from '@/shared/v1/domain/contracts';

export const deleteAdminFaqCommandHandler = async (deleteAdminFaqData: DeleteAdminFaqCommand, lang: Language): Promise<void> => {
  const faqIsExist = await findAdminFaqByIdRepository()({
    faqId: deleteAdminFaqData.faqId,
  });

  if (faqIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        faqId: [t(ValidationMessages, ValidationMessage.FAQ_ID_NOT_FOUND, lang)],
      },
    });
  }

  await deleteAdminFaqRepository()({
    faqId: deleteAdminFaqData.faqId,
  });

  await invalidateCache(['faqs']);
};
