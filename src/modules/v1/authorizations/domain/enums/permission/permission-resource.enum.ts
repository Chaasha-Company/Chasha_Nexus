export enum PermissionResourceEnum {
  // =========================Early Access Requests=========================
  EARLY_ACCESS_REQUEST_PAGE = 'early_access_request_page',
  EARLY_ACCESS_REQUEST_GET_ALL = 'early_access_request_get_all',
  EARLY_ACCESS_REQUEST_LIST_OPTIONS = 'early_access_request_list_options',
  EARLY_ACCESS_REQUEST_DETAIL = 'early_access_request_detail',
  EARLY_ACCESS_REQUEST_UPDATE = 'early_access_request_update',

  // =========================FAQ Management=========================
  FAQ_PAGE = 'faq_page',
  FAQ_GET_ALL = 'faq_get_all',
  FAQ_LIST_OPTIONS = 'faq_list_options',
  FAQ_DETAIL = 'faq_detail',
  FAQ_CREATE = 'faq_create',
  FAQ_DELETE = 'faq_delete',
  FAQ_UPDATE = 'faq_update',

  // =========================Authorization System - Permission Management=========================
  PLATFORM_ADMIN_AUTHZ_PERMISSION_GET_ALL = 'platform_admin_authz_permission_get_all',
  BUSINESS_EMPLOYEE_AUTHZ_PERMISSION_GET_ALL = 'business_employee_authz_permission_get_all',

  // =========================Authorization System - Platform Admin Role Management=========================
  PLATFORM_ADMIN_AUTHZ_ROLE_LIST_OPTIONS = 'platform_admin_authz_role_list_option',
  PLATFORM_ADMIN_AUTHZ_ROLE_PAGE = 'platform_admin_authz_role_page',
  PLATFORM_ADMIN_AUTHZ_ROLE_LIST = 'platform_admin_authz_role_list',
  PLATFORM_ADMIN_AUTHZ_ROLE_DETAIL = 'platform_admin_authz_role_detail',
  PLATFORM_ADMIN_AUTHZ_ROLE_CREATE = 'platform_admin_authz_role_create',
  PLATFORM_ADMIN_AUTHZ_ROLE_UPDATE = 'platform_admin_authz_role_update',
  PLATFORM_ADMIN_AUTHZ_ROLE_DELETE = 'platform_admin_authz_role_delete',
  PLATFORM_ADMIN_AUTHZ_ROLE_ASSIGN_PERMISSION = 'platform_admin_authz_role_assign_permission',
  PLATFORM_ADMIN_AUTHZ_ROLE_REMOVE_PERMISSION = 'platform_admin_authz_role_remove_permission',
  PLATFORM_ADMIN_AUTHZ_ROLE_GET_PERMISSIONS = 'platform_admin_authz_role_get_permissions',
  PLATFORM_ADMIN_AUTHZ_ROLE_REPLACE_PERMISSIONS = 'platform_admin_authz_role_replace_permissions',
  PLATFORM_ADMIN_AUTHZ_ROLE_UPDATE_PERMISSION = 'platform_admin_authz_role_update_permission',

  // =========================Authorization System - Business Employee Role Management=========================
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_LIST_OPTIONS = 'business_employee_authz_role_list_option',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_PAGE = 'business_employee_authz_role_page',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_LIST = 'business_employee_authz_role_list',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_DETAIL = 'business_employee_authz_role_detail',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_CREATE = 'business_employee_authz_role_create',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_UPDATE = 'business_employee_authz_role_update',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_DELETE = 'business_employee_authz_role_delete',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_ASSIGN_PERMISSION = 'business_employee_authz_role_assign_permission',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_REMOVE_PERMISSION = 'business_employee_authz_role_remove_permission',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_GET_PERMISSIONS = 'business_employee_authz_role_get_permissions',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_REPLACE_PERMISSIONS = 'business_employee_authz_role_replace_permissions',
  BUSINESS_EMPLOYEE_AUTHZ_ROLE_UPDATE_PERMISSION = 'business_employee_authz_role_update_permission',
}
