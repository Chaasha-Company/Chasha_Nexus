import type { Request } from 'express';
import type { AppError } from '@/shared/v1/interfaces';
import type { ErrorsResponse } from '@/shared/v1/types';
import { ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const appErrorObjectCreatorHelper = (req: Request, err: AppError | string): ErrorsResponse => {
  if (typeof err === 'string') return { error_message: [err] };

  if ((err.details !== undefined || err.details !== null) && typeof err.details === 'object' && !Array.isArray(err.details)) {
    const details = err.details as Record<string, unknown>;
    const result: ErrorsResponse = {};
    Object.keys(details).forEach((key: string) => {
      const value = details[key];
      result[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    });
    return result;
  }

  return { error_message: [err.message ?? t(ResponseMessages, ResponseMessage.ERROR, req.lang)] };
};
