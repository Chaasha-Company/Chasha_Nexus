import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPermissionResourcePlatformAdminRoleAssignPermission1787605989232 implements MigrationInterface {
  name = 'AddPermissionResourcePlatformAdminRoleAssignPermission1787605989232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `permissions` CHANGE `permission_resource` `permission_resource` enum ('early_access_request_page', 'early_access_request_get_all', 'early_access_request_list_options', 'early_access_request_detail', 'early_access_request_update', 'platform_admin_authz_permission_get_all', 'business_employee_authz_permission_get_all', 'platform_admin_authz_role_list_option', 'platform_admin_authz_role_page', 'platform_admin_authz_role_list', 'platform_admin_authz_role_detail', 'platform_admin_authz_role_create', 'platform_admin_authz_role_update', 'platform_admin_authz_role_delete', 'platform_admin_authz_role_assign_permission') NOT NULL",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `permissions` CHANGE `permission_resource` `permission_resource` enum ('early_access_request_page', 'early_access_request_get_all', 'early_access_request_list_options', 'early_access_request_detail', 'early_access_request_update', 'platform_admin_authz_permission_get_all', 'business_employee_authz_permission_get_all', 'platform_admin_authz_role_list_option', 'platform_admin_authz_role_page', 'platform_admin_authz_role_list', 'platform_admin_authz_role_detail', 'platform_admin_authz_role_create', 'platform_admin_authz_role_update', 'platform_admin_authz_role_delete') NOT NULL",
    );
  }
}
