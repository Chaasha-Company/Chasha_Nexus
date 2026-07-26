import { ValidationMessage } from '@/shared/v1/enums/validation-message';

export const ValidationMessages = {
  // =========================Server Process Validation========================
  [ValidationMessage.UNEXPECTED_INTERNAL_ERROR]: {
    fa: 'خطا: سرور - یک خطای غیرمنتظره رخ داد.',
    en: 'Error: Server - An unexpected internal error occurred.',
  },

  [ValidationMessage.INVALID_SELECTED_LANGUAGE]: {
    fa: 'خطا: سرور - زبان انتخاب شده نامعتبر است.',
    en: 'Error: Server - The selected language is invalid.',
  },

  // =========================Zod Validation========================
  [ValidationMessage.BODY_IS_NOT_VALID]: {
    fa: 'خطا: بدنه - این کلید در درخواست نباید ارسال شود.',
    en: 'Error: Body - This field must not be included in the request.',
  },

  // =========================Multer Validation=========================
  [ValidationMessage.FILE_TYPE_NOT_ALLOWED]: {
    fa: 'خطا: نوع فایل - ارسال این نوع فایل مجاز نیست.',
    en: 'Error: File Type - This file type is not allowed.',
  },

  [ValidationMessage.FILE_FIELD_NOT_VALID]: {
    fa: 'خطا: فیلد فایل - مقدار نامعتبر است.',
    en: 'Error: File Field - Invalid field value.',
  },

  [ValidationMessage.FILE_TOO_LARGE]: {
    fa: 'خطا: حجم فایل - بیش از حد مجاز است.',
    en: 'Error: File Size - File exceeds the allowed limit.',
  },

  [ValidationMessage.TOO_MANY_FILES]: {
    fa: 'خطا: تعداد فایل‌ها - بیش از مقدار مجاز است.',
    en: 'Error: Files Count - Too many files uploaded.',
  },

  [ValidationMessage.UNEXPECTED_FILE]: {
    fa: 'خطا: فایل ناخواسته - این فیلد برای فایل پشتیبانی نمی‌شود.',
    en: 'Error: Unexpected File - This file field is not supported.',
  },

  [ValidationMessage.FILE_REQUIRED]: {
    fa: 'خطا: فایل - ارسال فایل در این مسیر الزامی است.',
    en: 'Error: File - File upload is required for this route.',
  },

  [ValidationMessage.TOO_MANY_PARTS]: {
    fa: 'خطا: بخش‌ها - تعداد بخش‌های ارسالی بیش از حد مجاز است.',
    en: 'Error: Parts - Too many multipart sections were sent.',
  },

  [ValidationMessage.FIELD_KEY_TOO_LONG]: {
    fa: 'خطا: کلید فیلد - طول کلید بیش از حد مجاز است.',
    en: 'Error: Field Key - Field name exceeds the allowed length.',
  },

  [ValidationMessage.FIELD_VALUE_TOO_LONG]: {
    fa: 'خطا: مقدار فیلد - طول مقدار بیش از حد مجاز است.',
    en: 'Error: Field Value - Field value exceeds the allowed length.',
  },

  [ValidationMessage.TOO_MANY_FIELDS]: {
    fa: 'خطا: فیلدها - تعداد فیلدهای ارسالی بیش از حد مجاز است.',
    en: 'Error: Fields - Too many fields were submitted.',
  },

  [ValidationMessage.MISSING_FIELD_NAME]: {
    fa: 'خطا: فیلد - نام یکی از فیلدهای مورد انتظار یافت نشد.',
    en: 'Error: Field - A required field name is missing.',
  },

  // =========================Counsel Validation========================
  [ValidationMessage.COUNSEL_REQUEST_FULL_NAME_IS_REQUIRED]: {
    fa: 'خطا: نام و نام خانوادگی مشاوره - این فیلد الزامی است و باید رشته باشد.',
    en: 'Error: Counsel Full Name - This field is required and must be a string.',
  },

  [ValidationMessage.COUNSEL_REQUEST_PHONE_NUMBER_IS_REQUIRED]: {
    fa: 'خطا: شماره تماس مشاوره - این فیلد الزامی است و باید رشته باشد.',
    en: 'Error: Counsel Phone Number - This field is required and must be a string.',
  },

  [ValidationMessage.COUNSEL_REQUEST_DESCRIPTION_IS_REQUIRED]: {
    fa: 'خطا: توضیحات مشاوره - این فیلد الزامی است و باید رشته باشد.',
    en: 'Error: Counsel Description - This field is required and must be a string.',
  },

  [ValidationMessage.COUNSEL_REQUEST_INFORMATION_ID_IS_REQUIRED]: {
    fa: 'خطا: شناسه برند - این فیلد الزامی است و باید رشته باشد.',
    en: 'Error: Counsel Information Id - This field is required and must be a string.',
  },

  [ValidationMessage.COUNSEL_REQUEST_INFORMATION_ID_IS_ONLY_36_CH]: {
    fa: 'خطا: توضیحات مشاوره - 36 نویسه باید ارسال شود.',
    en: 'Error: Counsel Information Id - length is 36 characters.',
  },

  [ValidationMessage.COUNSEL_REQUEST_INFORMATION_IS_EXIST]: {
    fa: 'خطا: مشاوره برند - موردی با این مشخصه یافت نشد..',
    en: 'Error: Counsel Information Id - Not found with this ID.',
  },

  [ValidationMessage.COUNSEL_REQUEST_PHONE_NUMBER_IS_NOT_VALID_FORMAT]: {
    fa: 'خطا: شماره تماس مشاوره - فرمت شماره تماس ارسال شده نادرست است.',
    en: 'Error: Counsel Phone Number - Invalid phone number format.',
  },

  [ValidationMessage.COUNSEL_REQUEST_DESCRIPTION_IS_ONLY_120_CH]: {
    fa: 'خطا: توضیحات مشاوره - حداکثر 120 نویسه مجاز است.',
    en: 'Error: Counsel Description - Maximum length is 120 characters.',
  },

  [ValidationMessage.COUNSEL_REQUEST_EXISTS_WITH_THIS_PHONE_NUMBER]: {
    fa: 'خطا: شماره تماس مشاوره - قبلاً برای این شماره جلسه‌ای رزرو شده است.',
    en: 'Error: Counsel Phone Number - A session has already been booked for this number.',
  },

  // =========================Login Validation========================
  [ValidationMessage.LOGIN_USERNAME_REQUIRED]: {
    fa: 'خطا: نام کاربری ورود - این فیلد الزامی است و باید رشته باشد.',
    en: 'Error: Login Username - This field is required and must be a string.',
  },

  [ValidationMessage.LOGIN_USERNAME_MIN_LENGTH]: {
    fa: 'خطا: نام کاربری ورود - باید حداقل 3 نویسه باشد.',
    en: 'Error: Login Username - Must be at least 3 characters.',
  },

  [ValidationMessage.LOGIN_USERNAME_MAX_LENGTH]: {
    fa: 'خطا: نام کاربری ورود - باید حداکثر 54 نویسه باشد.',
    en: 'Error: Login Username - Must be at most 54 characters.',
  },

  [ValidationMessage.LOGIN_PASSWORD_REQUIRED]: {
    fa: 'خطا: گذرواژه ورود - این فیلد الزامی است و باید رشته باشد.',
    en: 'Error: Login Password - This field is required and must be a string.',
  },

  [ValidationMessage.LOGIN_PASSWORD_MIN_LENGTH]: {
    fa: 'خطا: گذرواژه ورود - باید حداقل 8 نویسه باشد.',
    en: 'Error: Login Password - Must be at least 8 characters.',
  },

  [ValidationMessage.LOGIN_PASSWORD_MAX_LENGTH]: {
    fa: 'خطا: گذرواژه ورود - باید حداکثر 64 نویسه باشد.',
    en: 'Error: Login Password - Must be at most 64 characters.',
  },

  [ValidationMessage.LOGIN_USERNAME_OR_PASSWORD_NOT_FOUND]: {
    fa: 'خطا: نام کابری یا گذرواژه ورود - نام کاربری یا رمز عبور اشتباه است.',
    en: 'Error: Login Password Or Username - Password or Username is Wrong.',
  },
} as const;
