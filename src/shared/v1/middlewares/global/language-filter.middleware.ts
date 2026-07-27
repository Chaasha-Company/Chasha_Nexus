import type { Request, Response, NextFunction } from 'express';
import { ResponseMessages, ValidationMessages, t, type Language } from '@/infrastructure/translator-system/i18n';
import { ValidationMessage } from '@/shared/v1/enums/validation-message';
import { throwBadRequestException } from '@/shared/v1/exceptions/bad-request';
import { ResponseMessage } from '@/shared/v1/enums';

export const languageFilterMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const allowedLanguage = ['fa', 'en'];

  const selectedLanguage = req.params.lang;

  if (!allowedLanguage.includes(selectedLanguage as string)) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.ERROR, 'fa'),
      details: {
        ':lang': [t(ValidationMessages, ValidationMessage.INVALID_SELECTED_LANGUAGE, 'fa')],
      },
    });
  }
  req.lang = selectedLanguage as Language;
  next();
};
