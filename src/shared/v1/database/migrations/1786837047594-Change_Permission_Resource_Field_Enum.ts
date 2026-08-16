import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangePermissionResourceFieldEnum1786837047594 implements MigrationInterface {
  name = 'ChangePermissionResourceFieldEnum1786837047594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `permissions` CHANGE `permission_resource` `permission_resource` enum ('early_access_request_page', 'early_access_request_get_all', 'early_access_request_list_options') NOT NULL");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `permissions` CHANGE `permission_resource` `permission_resource` enum ('admin', 'business') NOT NULL");
  }
}
