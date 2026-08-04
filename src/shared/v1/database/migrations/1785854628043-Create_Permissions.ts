import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePermissions1785854628043 implements MigrationInterface {
  name = 'CreatePermissions1785854628043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `permissions` (`permission_id` varchar(36) NOT NULL, `permission_key` varchar(150) NOT NULL, `permission_version` int NOT NULL DEFAULT '1', `permission_module` varchar(100) NOT NULL, `permission_action` enum ('read', 'create', 'update', 'delete', 'manage', 'approve', 'export') NOT NULL, `permission_type` enum ('page', 'action', 'feature') NOT NULL, `permission_label_fa` varchar(255) NOT NULL, `permission_label_en` varchar(255) NOT NULL, `permission_description_fa` text NULL, `permission_description_en` text NULL, `permission_navigation` json NULL, `permission_is_active` tinyint NOT NULL DEFAULT 1, `permission_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `permission_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `permission_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_3e3b7dd3ed2cf02975cd963bcd` (`permission_key`), PRIMARY KEY (`permission_id`)) ENGINE=InnoDB",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_3e3b7dd3ed2cf02975cd963bcd` ON `permissions`');
    await queryRunner.query('DROP TABLE `permissions`');
  }
}
