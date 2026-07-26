import { format } from 'date-fns-jalali';
import { faIR } from 'date-fns-jalali/locale';

export const persianDateReturnerHelper = (date: Date): string =>
  format(date, 'yyyy/MM/dd - HH:mm', {
    locale: faIR,
  });
