import type { DeleteAdminFaqTypeCommand } from '@/modules/v1/faqs/application';
import { deleteAdminFaqTypeRepository, findAdminFaqTypeByIdRepository } from '@/modules/v1/faqs/infrastructure';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { invalidateCache } from '@/shared/v1/domain/contracts';

export const deleteAdminFaqTypeCommandHandler = async (deleteAdminFaqTypeData: DeleteAdminFaqTypeCommand, lang: Language): Promise<void> => {
  const faqTypeIsExist = await findAdminFaqTypeByIdRepository()({
    faqTypeId: deleteAdminFaqTypeData.faqTypeId,
  });

  if (faqTypeIsExist === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        faqTypeId: [t(ValidationMessages, ValidationMessage.FAQ_TYPE_ID_NOT_FOUND, lang)],
      },
    });
  }

  await deleteAdminFaqTypeRepository()({
    faqTypeId: deleteAdminFaqTypeData.faqTypeId,
  });

  await invalidateCache(['faq-types']);
};
