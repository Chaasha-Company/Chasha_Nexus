export enum ResponseMessage {
  // =========================Success Messages=========================
  SUCCESS = 'SUCCESS',
  CREATED_SUCCESS = 'CREATED_SUCCESS',
  UPDATED_SUCCESS = 'UPDATED_SUCCESS',
  DELETED_SUCCESS = 'DELETED_SUCCESS',

  // =========================General Errors=========================
  ERROR = 'ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  VPN_DETECTED = 'VPN_DETECTED',

  // =========================Validation Errors=========================
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  // =========================Authentication And Authorization=========================
  TOKEN_INVALID_STRUC = 'TOKEN_INVALID_STRUC',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  USER_LOGOUT = 'USER_LOGOUT',

  // =========================Data Related Messages=========================
  NO_DATA_RECEIVED = 'NO_DATA_RECEIVED',
  NOT_FOUND = 'NOT_FOUND',
  DATA_CONFLICT = 'DATA_CONFLICT',

  // =========================Rate Limiting=========================
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',

  // =========================Database Errors=========================
  RECORD_ALREADY_EXISTS = 'RECORD_ALREADY_EXISTS',

  // =========================File And Storage Operations=========================
  FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED',
  FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS',
  FILE_TYPE_NOT_ALLOWED = 'FILE_TYPE_NOT_ALLOWED',
}
