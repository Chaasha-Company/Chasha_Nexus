import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBusinessEmployeeAuthzPermissionGetAllPermission1787094133874 implements MigrationInterface {
  name = 'AddBusinessEmployeeAuthzPermissionGetAllPermission1787094133874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `permissions` CHANGE `permission_resource` `permission_resource` enum ('early_access_request_page', 'early_access_request_get_all', 'early_access_request_list_options', 'early_access_request_detail', 'early_access_request_update', 'platform_admin_authz_permission_get_all', 'business_employee_authz_permission_get_all') NOT NULL",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `permissions` CHANGE `permission_resource` `permission_resource` enum ('early_access_request_page', 'early_access_request_get_all', 'early_access_request_list_options', 'early_access_request_detail', 'early_access_request_update') NOT NULL",
    );
  }
}
