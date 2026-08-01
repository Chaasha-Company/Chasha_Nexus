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

  // =========================Platform Admin Login Validation=========================
  [ValidationMessage.PLATFORM_ADMIN_LOGIN_NOT_FOUND_PHONE_NUMBER]: {
    fa: 'خطا: شماره تماس - کاربری با این مشخصات پیدا نشد.',
    en: 'Error: Phone number - No user was found with the provided credentials.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_PASSWORD_INCORRECT]: {
    fa: 'خطا: رمز عبور - صحیح نیست.',
    en: 'Error Password - is incorrect.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_PHONE_NUMBER_REQUIRED]: {
    fa: 'خطا: شماره تماس - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Phone number - This field is required and must be a valid string.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_PHONE_NUMBER_BAD_FORMAT]: {
    fa: 'خطا: شماره تماس - باید 11 رقم باشد و با صفر شروع شود..',
    en: 'Error: Phone number - It must be 11 digits long and start with 0.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_PASSWORD_REQUIRED]: {
    fa: 'خطا: رمز عبور - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Password - This field is required and must be a valid string.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_PASSWORD_IS_ONLY_64_CH]: {
    fa: 'خطا: رمز عبور - حداکثر ۶۴ کاراکتر مجاز است.',
    en: 'Error: Password - Maximum length is 64 characters.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_ALREADY_IN_QUEUE]: {
    fa: 'خطا: درخواست ورود شما در حال انتظار است. لطفاً به صفحه تأیید کد بازگردید و کد ارسال‌شده را وارد کنید.',
    en: 'Error: Your login request is already pending. Please return to the verification page and enter the verification code that was sent to you.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_SESSION_ID_REQUIRED]: {
    fa: 'خطا: شناسه نشست ورود - این فیلد اجباری است و باید رشته باشد.',
    en: 'Error: Login session ID - This field is required and must be a string.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_SESSION_ID_NOT_FOUND]: {
    fa: 'خطا: نشست ورود یافت نشد یا منقضی شده است. لطفاً دوباره فرآیند ورود را آغاز کنید.',
    en: 'Error: Login session was not found or has expired. Please start the login process again.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_SESSION_ID_IS_ONLY_32_CH]: {
    fa: 'خطا: شناسه نشست ورود - باید یک شناسه معتبر (UUID) باشد.',
    en: 'Error: Login session ID - Must be a valid UUID.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_REQUIRED]: {
    fa: 'خطا: کد تأیید - این فیلد اجباری است و باید رشته باشد.',
    en: 'Error: Verification code - This field is required and must be a string.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_IS_ONLY_6_CH]: {
    fa: 'خطا: کد تأیید - باید دقیقاً ۶ رقم باشد.',
    en: 'Error: Verification code - Must contain exactly 6 digits.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_INVALID]: {
    fa: 'خطا: کد تأیید وارد شده صحیح نیست.',
    en: 'Error: The verification code you entered is invalid.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_NOT_EXPIRED]: {
    fa: 'کد تأیید معتبر است. لطفاً برای ادامه فرآیند ورود به صفحه تأیید مراجعه کنید.',
    en: 'The verification code is valid. Please continue the login process on the verification page.',
  },

  [ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_EXPIRED]: {
    fa: 'خطا: کد تأیید منقضی شده است. لطفاً درخواست ارسال مجدد کد تأیید را ثبت کنید.',
    en: 'Error: The verification code has expired. Please request a new verification code.',
  },

  // =========================Business Login Validation=========================
  [ValidationMessage.BUSINESS_LOGIN_NOT_FOUND_PHONE_NUMBER]: {
    fa: 'خطا: شماره تماس - کاربری با این مشخصات پیدا نشد.',
    en: 'Error: Phone number - No user was found with the provided credentials.',
  },

  [ValidationMessage.BUSINESS_LOGIN_PASSWORD_INCORRECT]: {
    fa: 'خطا: رمز عبور - صحیح نیست.',
    en: 'Error: Password - is incorrect.',
  },

  [ValidationMessage.BUSINESS_LOGIN_PHONE_NUMBER_REQUIRED]: {
    fa: 'خطا: شماره تماس - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Phone number - This field is required and must be a valid string.',
  },

  [ValidationMessage.BUSINESS_LOGIN_PHONE_NUMBER_BAD_FORMAT]: {
    fa: 'خطا: شماره تماس - باید 11 رقم باشد و با صفر شروع شود.',
    en: 'Error: Phone number - It must be 11 digits long and start with 0.',
  },

  [ValidationMessage.BUSINESS_LOGIN_PASSWORD_REQUIRED]: {
    fa: 'خطا: رمز عبور - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Password - This field is required and must be a valid string.',
  },

  [ValidationMessage.BUSINESS_LOGIN_PASSWORD_IS_ONLY_64_CH]: {
    fa: 'خطا: رمز عبور - حداکثر ۶۴ کاراکتر مجاز است.',
    en: 'Error: Password - Maximum length is 64 characters.',
  },
} as const;
