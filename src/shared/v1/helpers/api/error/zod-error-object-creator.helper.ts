import type { ZodError, ZodIssue } from 'zod';
import type { Request } from 'express';
import { type ErrorsResponse } from '@/shared/v1/types';

import { ValidationMessage } from '@/shared/v1/enums';
import { ValidationMessages, t } from '@/infrastructure/translator-system/i18n';

export const zodErrorObjectCreatorHelper = (req: Request, issues: ZodError['issues']): ErrorsResponse => {
  const result: ErrorsResponse = {};

  issues.forEach((issue: ZodIssue) => {
    let path: string;

    if (issue.path.length === 0) {
      path = 'error_message';
    } else {
      path = issue.path.join('.');
    }

    if (issue.code === 'unrecognized_keys') {
      const { keys } = issue;

      if (keys.length >= 1) {
        path = keys[0];
      }

      result[path] = result[path] ?? [];
      result[path].push(t(ValidationMessages, ValidationMessage.BODY_IS_NOT_VALID, req.lang));
      return;
    }
    result[path] = result[path] ?? [];
    result[path].push(issue.message);
  });

  return result;
};
