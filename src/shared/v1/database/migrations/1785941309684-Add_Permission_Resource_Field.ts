import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPermissionResourceField1785941309684 implements MigrationInterface {
  name = 'AddPermissionResourceField1785941309684';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `permissions` ADD `permission_resource` enum ('admin', 'business') NOT NULL");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `permissions` DROP COLUMN `permission_resource`');
  }
}
