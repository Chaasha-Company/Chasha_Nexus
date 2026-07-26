export enum ErrorCode {
  // =========================Validation Errors=========================
  VALIDATION_ERROR = 'E1001',

  // =========================Authentication & Authorization=========================
  UNAUTHORIZED = 'E1010',
  FORBIDDEN = 'E1011',
  TOKEN_EXPIRED = 'E1012',
  INVALID_TOKEN = 'E1013',
  USER_NOT_FOUND = 'E1014',
  INVALID_CREDENTIALS = 'E1015',
  VPN_DETECTED = 'E1016',

  // =========================Resource / Data errors=========================
  NOT_FOUND = 'E1020',
  DATA_CONFLICT = 'E1021',
  RECORD_ALREADY_EXISTS = 'E1022',
  NO_DATA_RECEIVED = 'E1023',

  // =========================Database & Server errors=========================
  INTERNAL_SERVER_ERROR = 'E1030',

  // =========================Rate limiting / Throttling=========================
  TOO_MANY_REQUESTS = 'E1040',

  // =========================File / Upload errors=========================
  FILE_UPLOAD_FAILED = 'E1050',
  FILE_TYPE_NOT_ALLOWED = 'E1051',
  FILE_TOO_LARGE = 'E1052',
  FIELD_NAME_INVALID = 'E1053',
  TOO_MANY_FILES = 'E1054',
  UNEXPECTED_FILE = 'E1055',
  FILE_REQUIRED = 'E1056',
  TOO_MANY_PARTS = 'E1057',
  FIELD_KEY_TOO_LONG = 'E1058',
  FIELD_VALUE_TOO_LONG = 'E1059',
  TOO_MANY_FIELDS = 'E1060',
  MISSING_FIELD_NAME = 'E1061',

  // =========================Miscellaneous=========================
  BAD_REQUEST = 'E1090',
  UNKNOWN_ERROR = 'E1091',
}
