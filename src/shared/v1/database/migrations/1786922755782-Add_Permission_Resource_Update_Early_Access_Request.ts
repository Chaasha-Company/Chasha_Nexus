import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPermissionResourceUpdateEarlyAccessRequest1786922755782 implements MigrationInterface {
  name = 'AddPermissionResourceUpdateEarlyAccessRequest1786922755782';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `permissions` CHANGE `permission_resource` `permission_resource` enum ('early_access_request_page', 'early_access_request_get_all', 'early_access_request_list_options', 'early_access_request_detail', 'early_access_request_update') NOT NULL",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `permissions` CHANGE `permission_resource` `permission_resource` enum ('early_access_request_page', 'early_access_request_get_all', 'early_access_request_list_options', 'early_access_request_detail') NOT NULL");
  }
}
