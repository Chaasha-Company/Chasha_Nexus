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

  // =========================Common Validation=========================
  [ValidationMessage.UPDATE_AT_LEAST_ONE_FIELD_REQUIRED]: {
    fa: 'خطا: بروزرسانی - حداقل یک فیلد برای بروزرسانی باید ارسال شود.',
    en: 'Error: Update - At least one field must be provided for update.',
  },

  // =========================Pagination Validation=========================
  [ValidationMessage.PAGINATION_PAGE_REQUIRED]: {
    fa: 'خطا: صفحه‌بندی - شماره صفحه الزامی است.',
    en: 'Error: Pagination - Page number is required.',
  },

  [ValidationMessage.PAGINATION_PAGE_INVALID]: {
    fa: 'خطا: صفحه‌بندی - شماره صفحه باید یک عدد صحیح بزرگ‌تر از صفر باشد.',
    en: 'Error: Pagination - Page number must be a positive integer.',
  },

  [ValidationMessage.PAGINATION_LIMIT_REQUIRED]: {
    fa: 'خطا: صفحه‌بندی - تعداد آیتم‌ها در هر صفحه الزامی است.',
    en: 'Error: Pagination - Items per page is required.',
  },

  [ValidationMessage.PAGINATION_LIMIT_INVALID]: {
    fa: 'خطا: صفحه‌بندی - تعداد آیتم‌ها در هر صفحه باید یک عدد صحیح بزرگ‌تر از صفر باشد.',
    en: 'Error: Pagination - Items per page must be a positive integer.',
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

  // =========================Business Refresh Token Validation=========================
  [ValidationMessage.BUSINESS_REFRESH_TOKEN_REQUIRED]: {
    fa: 'خطا: توکن بروزرسانی - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Refresh token - This field is required and must be a valid string.',
  },

  [ValidationMessage.BUSINESS_REFRESH_TOKEN_INVALID]: {
    fa: 'خطا: توکن بروزرسانی - نامعتبر است یا منقضی شده است.',
    en: 'Error: Refresh token - is invalid or has expired.',
  },

  // =========================Platform Admin Refresh Token Validation=========================
  [ValidationMessage.PLATFORM_ADMIN_REFRESH_TOKEN_REQUIRED]: {
    fa: 'خطا: توکن بروزرسانی ادمین - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Platform admin refresh token - This field is required and must be a valid string.',
  },

  [ValidationMessage.PLATFORM_ADMIN_REFRESH_TOKEN_INVALID]: {
    fa: 'خطا: توکن بروزرسانی ادمین - نامعتبر است یا منقضی شده است.',
    en: 'Error: Platform admin refresh token - is invalid or has expired.',
  },

  [ValidationMessage.PLATFORM_ADMIN_REFRESH_TOKEN_SESSION_NOT_FOUND]: {
    fa: 'خطا: نشست ادمین - نشست احراز هویت برای این توکن یافت نشد.',
    en: 'Error: Platform admin session - Authentication session was not found for this token.',
  },

  // =========================Business Forgot Password Validation=========================
  [ValidationMessage.BUSINESS_FORGOT_PASSWORD_PHONE_NUMBER_REQUIRED]: {
    fa: 'خطا: شماره تماس - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Phone number - This field is required and must be a valid string.',
  },

  [ValidationMessage.BUSINESS_FORGOT_PASSWORD_PHONE_NUMBER_BAD_FORMAT]: {
    fa: 'خطا: شماره تماس - باید ۱۱ رقم باشد و با صفر شروع شود.',
    en: 'Error: Phone number - It must be 11 digits long and start with 0.',
  },

  [ValidationMessage.BUSINESS_FORGOT_PASSWORD_VERIFY_RESET_TOKEN_REQUIRED]: {
    fa: 'خطا: توکن بازنشانی رمز عبور - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Password reset token - This field is required and must be a valid string.',
  },

  [ValidationMessage.BUSINESS_FORGOT_PASSWORD_VERIFY_RESET_TOKEN_INVALID]: {
    fa: 'خطا: توکن بازنشانی رمز عبور - نامعتبر یا منقضی شده است.',
    en: 'Error: Password reset token - The token is invalid or expired.',
  },

  [ValidationMessage.BUSINESS_FORGOT_PASSWORD_VERIFY_RESET_TOKEN_IS_ONLY_32_CH]: {
    fa: 'خطا: توکن بازنشانی رمز عبور - باید دقیقاً ۳۲ کاراکتر باشد.',
    en: 'Error: Password reset token - Must contain exactly 32 characters.',
  },

  [ValidationMessage.BUSINESS_FORGOT_PASSWORD_VERIFY_NEW_PASSWORD_REQUIRED]: {
    fa: 'خطا: رمز عبور جدید - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: New password - This field is required and must be a valid string.',
  },

  [ValidationMessage.BUSINESS_FORGOT_PASSWORD_VERIFY_NEW_PASSWORD_IS_ONLY_64_CH]: {
    fa: 'خطا: رمز عبور جدید - حداکثر ۶۴ کاراکتر مجاز است.',
    en: 'Error: New password - Maximum length is 64 characters.',
  },

  [ValidationMessage.BUSINESS_FORGOT_PASSWORD_RESET_SESSION_INVALID]: {
    fa: 'خطا: نشست بازیابی رمز عبور - نشست بازیابی رمز عبور نامعتبر یا منقضی شده است.',
    en: 'Error: Password reset session - The password reset session is invalid or has expired.',
  },

  [ValidationMessage.PLATFORM_ADMIN_REFRESH_TOKEN_EXPIRED]: {
    fa: 'خطا: نشست ادمین - نشست احراز هویت منقضی شده است.',
    en: 'Error: Platform admin session - Authentication session has expired.',
  },

  // =========================Authentication Middleware Validation=========================
  [ValidationMessage.ACCESS_TOKEN_REQUIRED]: {
    fa: 'خطا: توکن دسترسی - ارسال این فیلد الزامی است.',
    en: 'Error: Access token - This field is required.',
  },

  [ValidationMessage.ACCESS_TOKEN_INVALID]: {
    fa: 'خطا: توکن دسترسی - نامعتبر یا منقضی شده است.',
    en: 'Error: Access token - The token is invalid or expired.',
  },

  [ValidationMessage.ACCESS_TOKEN_SESSION_INVALID]: {
    fa: 'خطا: نشست کاربر - نشست فعال برای این توکن یافت نشد.',
    en: 'Error: User session - No active session was found for this token.',
  },

  // =========================Authorization Validation=========================
  [ValidationMessage.AUTHORIZATION_PLATFORM_ADMIN_ROLE_NOT_FOUND]: {
    fa: 'خطا: نقش ادمین - نقش دسترسی برای این کاربر یافت نشد.',
    en: 'Error: Platform admin role - The assigned role was not found.',
  },

  [ValidationMessage.AUTHORIZATION_BUSINESS_ROLE_NOT_FOUND]: {
    fa: 'خطا: نقش کسب‌وکار - نقش دسترسی برای این کارمند یافت نشد.',
    en: 'Error: Business role - The assigned role was not found.',
  },

  [ValidationMessage.AUTHORIZATION_PERMISSION_DENIED]: {
    fa: 'خطا: دسترسی - شما اجازه انجام این عملیات را ندارید.',
    en: 'Error: Permission - You do not have permission to perform this action.',
  },

  // =========================Early Access Request Validation=========================
  [ValidationMessage.EARLY_ACCESS_REQUEST_FULL_NAME_REQUIRED]: {
    fa: 'خطا: نام و نام خانوادگی - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Full name - This field is required and must be a valid string.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_FULL_NAME_TOO_SHORT]: {
    fa: 'خطا: نام و نام خانوادگی - حداقل ۲ کاراکتر الزامی است.',
    en: 'Error: Full name - Minimum length is 2 characters.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_FULL_NAME_TOO_LONG]: {
    fa: 'خطا: نام و نام خانوادگی - حداکثر ۱۵۰ کاراکتر مجاز است.',
    en: 'Error: Full name - Maximum length is 150 characters.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_PHONE_NUMBER_REQUIRED]: {
    fa: 'خطا: شماره تماس - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Phone number - This field is required and must be a valid string.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_PHONE_NUMBER_BAD_FORMAT]: {
    fa: 'خطا: شماره تماس - باید ۱۱ رقم باشد و با صفر شروع شود.',
    en: 'Error: Phone number - It must be 11 digits long and start with 0.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_NAME_REQUIRED]: {
    fa: 'خطا: نام مجموعه - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Business name - This field is required and must be a valid string.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_NAME_TOO_SHORT]: {
    fa: 'خطا: نام مجموعه - حداقل ۲ کاراکتر الزامی است.',
    en: 'Error: Business name - Minimum length is 2 characters.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_NAME_TOO_LONG]: {
    fa: 'خطا: نام مجموعه - حداکثر ۱۵۰ کاراکتر مجاز است.',
    en: 'Error: Business name - Maximum length is 150 characters.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_TYPE_REQUIRED]: {
    fa: 'خطا: نوع کسب‌وکار - این فیلد اجباری است و باید یک رشته معتبر باشد.',
    en: 'Error: Business type - This field is required and must be a valid string.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_TYPE_NOT_FOUND]: {
    fa: 'خطا: نوع کسب‌وکار - نوع کسب‌وکاری با این اسلاگ پیدا نشد.',
    en: 'Error: Business type - No business type was found with the provided slug.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_STATUS_ID_INVALID]: {
    fa: 'خطا: وضعیت درخواست - شناسه وضعیت ارسال شده نامعتبر است.',
    en: 'Error: Request status - The provided status ID is invalid.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_ALREADY_EXISTS]: {
    fa: 'خطا: درخواست دسترسی زودهنگام - برای این شماره تماس قبلاً درخواست ثبت شده است.',
    en: 'Error: Early access request - An early access request already exists for this phone number.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_ID_REQUIRED]: {
    fa: 'خطا: شناسه درخواست دسترسی زودهنگام - این فیلد اجباری است و باید یک رشته باشد.',
    en: 'Error: Early access request ID - This field is required and must be a string.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_ID_INVALID]: {
    fa: 'خطا: شناسه درخواست دسترسی زودهنگام - باید یک عدد صحیح بزرگ‌تر از صفر باشد.',
    en: 'Error: Early access request ID - Must be a positive integer.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_ID_NOT_FOUND]: {
    fa: 'خطا: شناسه درخواست دسترسی زودهنگام - درخواست موردنظر یافت نشد.',
    en: 'Error: Early access request ID - The requested early access request was not found.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_TYPE_ID_INVALID]: {
    fa: 'خطا: نوع کسب‌وکار - شناسه نوع کسب‌وکار ارسال شده نامعتبر است.',
    en: 'Error: Business type - The provided business type ID is invalid.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_FULL_NAME_INVALID]: {
    fa: 'خطا: نام و نام خانوادگی - مقدار ارسال شده نامعتبر است.',
    en: 'Error: Full name - The provided value is invalid.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_PHONE_NUMBER_INVALID]: {
    fa: 'خطا: شماره تماس - مقدار ارسال شده نامعتبر است.',
    en: 'Error: Phone number - The provided value is invalid.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_CODE_INVALID]: {
    fa: 'خطا: کد درخواست - مقدار ارسال شده نامعتبر است.',
    en: 'Error: Request code - The provided value is invalid.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_NAME_INVALID]: {
    fa: 'خطا: نام مجموعه - مقدار ارسال شده نامعتبر است.',
    en: 'Error: Business name - The provided value is invalid.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_METADATA_INVALID]: {
    fa: 'خطا: اطلاعات اضافی - مقدار ارسال شده باید یک شیء معتبر باشد.',
    en: 'Error: Metadata - The provided value must be a valid object.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_STATUS_ID_NOT_FOUND]: {
    fa: 'خطا: وضعیت درخواست - وضعیت موردنظر یافت نشد.',
    en: 'Error: Request status - The requested status was not found.',
  },

  [ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_TYPE_ID_NOT_FOUND]: {
    fa: 'خطا: نوع کسب‌وکار - نوع کسب‌وکار موردنظر یافت نشد.',
    en: 'Error: Business type - The requested business type was not found.',
  },

  // =========================Faq Validation=========================
  [ValidationMessage.FAQ_TYPE_INVALID]: {
    fa: 'خطا: نوع سوالات متداول - مقدار ارسال شده فقط می‌تواند landing یا business باشد.',
    en: 'Error: FAQ type - The value must be either landing or business.',
  },

  // =========================Platform Admin Role Validation=========================
  [ValidationMessage.PLATFORM_ADMIN_ROLE_IS_ACTIVE_INVALID]: {
    fa: 'خطا: نقش‌های ادمین - مقدار فیلتر وضعیت فعال باید true یا false باشد.',
    en: 'Error: Platform admin role - The active status filter must be either true or false.',
  },

  [ValidationMessage.PLATFORM_ADMIN_ROLE_ID_REQUIRED]: {
    fa: 'خطا: نقش‌های ادمین - شناسه نقش الزامی است.',
    en: 'Error: Platform admin role - The role id is required.',
  },

  [ValidationMessage.PLATFORM_ADMIN_ROLE_ID_NOT_FOUND]: {
    fa: 'خطا: نقش‌های ادمین - نقش موردنظر یافت نشد.',
    en: 'Error: Platform admin role - The requested role was not found.',
  },

  [ValidationMessage.PLATFORM_ADMIN_ROLE_KEY_REQUIRED]: {
    fa: 'خطا: نقش‌های ادمین - کلید نقش الزامی است.',
    en: 'Error: Platform admin role - The role key is required.',
  },

  [ValidationMessage.PLATFORM_ADMIN_ROLE_KEY_TOO_LONG]: {
    fa: 'خطا: نقش‌های ادمین - کلید نقش نمی‌تواند بیش از ۱۰۰ کاراکتر باشد.',
    en: 'Error: Platform admin role - The role key must not exceed 100 characters.',
  },

  [ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_FA_REQUIRED]: {
    fa: 'خطا: نقش‌های ادمین - نام فارسی نقش الزامی است.',
    en: 'Error: Platform admin role - The Persian role name is required.',
  },

  [ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_FA_TOO_LONG]: {
    fa: 'خطا: نقش‌های ادمین - نام فارسی نقش نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',
    en: 'Error: Platform admin role - The Persian role name must not exceed 255 characters.',
  },

  [ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_EN_REQUIRED]: {
    fa: 'خطا: نقش‌های ادمین - نام انگلیسی نقش الزامی است.',
    en: 'Error: Platform admin role - The English role name is required.',
  },

  [ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_EN_TOO_LONG]: {
    fa: 'خطا: نقش‌های ادمین - نام انگلیسی نقش نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',
    en: 'Error: Platform admin role - The English role name must not exceed 255 characters.',
  },

  [ValidationMessage.PLATFORM_ADMIN_ROLE_ALREADY_EXISTS]: {
    fa: 'خطا: نقش‌های ادمین - نقشی با این کلید از قبل وجود دارد.',
    en: 'Error: Platform admin role - A role with this key already exists.',
  },
} as const;
