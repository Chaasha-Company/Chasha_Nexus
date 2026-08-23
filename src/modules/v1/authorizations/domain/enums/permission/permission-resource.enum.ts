export enum PermissionResourceEnum {
  // =========================Early Access Requests=========================
  EARLY_ACCESS_REQUEST_PAGE = 'early_access_request_page',
  EARLY_ACCESS_REQUEST_GET_ALL = 'early_access_request_get_all',
  EARLY_ACCESS_REQUEST_LIST_OPTIONS = 'early_access_request_list_options',
  EARLY_ACCESS_REQUEST_DETAIL = 'early_access_request_detail',
  EARLY_ACCESS_REQUEST_UPDATE = 'early_access_request_update',

  // =========================Authorization System - Permission Management=========================
  PLATFORM_ADMIN_AUTHZ_PERMISSION_GET_ALL = 'platform_admin_authz_permission_get_all',
  BUSINESS_EMPLOYEE_AUTHZ_PERMISSION_GET_ALL = 'business_employee_authz_permission_get_all',

  // =========================Authorization System - Role Management=========================
  PLATFORM_ADMIN_AUTHZ_ROLE_LIST_OPTIONS = 'platform_admin_authz_role_list_option',
  PLATFORM_ADMIN_AUTHZ_ROLE_PAGE = 'platform_admin_authz_role_page',
  PLATFORM_ADMIN_AUTHZ_ROLE_LIST = 'platform_admin_authz_role_list',
  PLATFORM_ADMIN_AUTHZ_ROLE_DETAIL = 'platform_admin_authz_role_detail',
  PLATFORM_ADMIN_AUTHZ_ROLE_CREATE = 'platform_admin_authz_role_create',
  PLATFORM_ADMIN_AUTHZ_ROLE_UPDATE = 'platform_admin_authz_role_update',
}
