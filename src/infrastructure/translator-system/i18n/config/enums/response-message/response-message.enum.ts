import { ResponseMessage } from '@/shared/v1/enums/response-message';

export const ResponseMessages = {
  // =========================Success Messages=========================
  [ResponseMessage.SUCCESS]: {
    fa: 'عملیات با موفقیت انجام شد.',
    en: 'Operation completed successfully.',
  },
  [ResponseMessage.CREATED_SUCCESS]: {
    fa: 'مورد با موفقیت ایجاد شد.',
    en: 'Item created successfully.',
  },
  [ResponseMessage.UPDATED_SUCCESS]: {
    fa: 'مورد با موفقیت به‌روزرسانی شد.',
    en: 'Item updated successfully.',
  },
  [ResponseMessage.DELETED_SUCCESS]: {
    fa: 'مورد با موفقیت حذف شد.',
    en: 'Item deleted successfully.',
  },

  // =========================General Errors=========================
  [ResponseMessage.ERROR]: {
    fa: 'عملیات با مشکل مواجه شده است.',
    en: 'The operation failed.',
  },
  [ResponseMessage.UNKNOWN_ERROR]: {
    fa: 'به نظر می‌رسد مشکلی به وجود آمده است.',
    en: 'An unexpected error occurred.',
  },
  [ResponseMessage.VPN_DETECTED]: {
    fa: 'به نظر میرسد وی پی ان شما روشن است. لطفا وی پی ان را خاموش و دوباره درخواست بزنید.',
    en: 'It seems your VPN is enabled. Please disable it and try again.',
  },

  // =========================Validation Errors=========================
  [ResponseMessage.VALIDATION_ERROR]: {
    fa: 'اعتبارسنجی با مشکل مواجه شده است.',
    en: 'Validation failed.',
  },

  // =========================Authentication And Authorization=========================
  [ResponseMessage.TOKEN_INVALID_STRUC]: {
    fa: 'ساختار توکن ارسال شده نادرست است.',
    en: 'The token structure is invalid.',
  },
  [ResponseMessage.UNAUTHORIZED]: {
    fa: 'اعتبارسنجی نشده اید. لطفا دوباره تلاش کنید.',
    en: 'You are not authenticated. Please try again.',
  },
  [ResponseMessage.FORBIDDEN]: {
    fa: 'به این عملیات دسترسی ندارید.',
    en: 'You do not have permission for this operation.',
  },
  [ResponseMessage.TOKEN_EXPIRED]: {
    fa: 'توکن شما منقضی شده است، لطفا دوباره وارد شوید.',
    en: 'Your token has expired. Please log in again.',
  },
  [ResponseMessage.SESSION_NOT_FOUND]: {
    fa: 'سشن مورد نظر پیدا نشد.',
    en: 'Session not found.',
  },
  [ResponseMessage.SESSION_EXPIRED]: {
    fa: 'سشن مورد نظر منقضی شده است.',
    en: 'Session expired.',
  },
  [ResponseMessage.INVALID_TOKEN]: {
    fa: 'توکن ارسال شده نامعتبر است.',
    en: 'The provided token is invalid.',
  },
  [ResponseMessage.USER_LOGOUT]: {
    fa: 'کاربر با موفقیت خارج شد.',
    en: 'User logged out successfully.',
  },

  // =========================Data Related Messages=========================
  [ResponseMessage.NO_DATA_RECEIVED]: {
    fa: 'به نظر می‌رسد داده‌ای ارسال نشده است.',
    en: 'No data received.',
  },
  [ResponseMessage.NOT_FOUND]: {
    fa: 'موردی با این مشخصات پیدا نشد.',
    en: 'Resource not found.',
  },
  [ResponseMessage.DATA_CONFLICT]: {
    fa: 'داده ارسال شده با داده‌های موجود در تداخل است.',
    en: 'Data conflict detected.',
  },

  // =========================Rate Limiting=========================
  [ResponseMessage.TOO_MANY_REQUESTS]: {
    fa: 'بیش از سقف مجاز درخواست ارسال کرده‌اید، لطفا بعدا تلاش کنید.',
    en: 'Too many requests. Please try again later.',
  },

  // =========================Database Errors=========================
  [ResponseMessage.RECORD_ALREADY_EXISTS]: {
    fa: 'رکورد مورد نظر از قبل وجود دارد.',
    en: 'The record already exists.',
  },

  // =========================File And Storage Operations=========================
  [ResponseMessage.FILE_UPLOAD_FAILED]: {
    fa: 'آپلود فایل با مشکل مواجه شد.',
    en: 'File upload failed.',
  },
  [ResponseMessage.FILE_UPLOAD_SUCCESS]: {
    fa: 'آپلود فایل با موفقیت انجام شد.',
    en: 'File uploaded successfully.',
  },
  [ResponseMessage.FILE_TYPE_NOT_ALLOWED]: {
    fa: 'نوع فایل ارسال شده مجاز نیست.',
    en: 'File type is not allowed.',
  },
} as const;
