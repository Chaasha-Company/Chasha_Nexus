import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlatformAdminsWithStatus1785160550784 implements MigrationInterface {
  name = 'CreatePlatformAdminsWithStatus1785160550784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `platform_admin_statuses` (`platform_admin_status_id` varchar(36) NOT NULL, `platform_admin_status_name` varchar(100) NOT NULL, `platform_admin_status_slug` varchar(100) NOT NULL, `platform_admin_status_description` text NULL, `platform_admin_status_sort_order` int NOT NULL DEFAULT '0', `platform_admin_status_is_system` tinyint NOT NULL DEFAULT 1, `platform_admin_status_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `platform_admin_status_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `platform_admin_status_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_8aadc209f796bf0fe1d6bc2919` (`platform_admin_status_slug`), PRIMARY KEY (`platform_admin_status_id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'CREATE TABLE `platform_admins` (`platform_admin_id` varchar(36) NOT NULL, `platform_admin_status_id` varchar(255) NOT NULL, `platform_admin_first_name` varchar(100) NOT NULL, `platform_admin_last_name` varchar(100) NOT NULL, `platform_admin_phone_number` varchar(11) NOT NULL, `platform_admin_password` varchar(64) NOT NULL, `platform_admin_is_phone_verified` tinyint NOT NULL DEFAULT 0, `platform_admin_last_login_at` timestamp NULL, `platform_admin_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `platform_admin_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `platform_admin_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_1e32bc1a6fb2c6f4bfe0737bf1` (`platform_admin_phone_number`), PRIMARY KEY (`platform_admin_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query('ALTER TABLE `platform_admins` ADD CONSTRAINT `FK_d53982a725eb6c9cddd781346a7` FOREIGN KEY (`platform_admin_status_id`) REFERENCES `platform_admin_statuses`(`platform_admin_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `platform_admins` DROP FOREIGN KEY `FK_d53982a725eb6c9cddd781346a7`');
    await queryRunner.query('DROP INDEX `IDX_1e32bc1a6fb2c6f4bfe0737bf1` ON `platform_admins`');
    await queryRunner.query('DROP TABLE `platform_admins`');
    await queryRunner.query('DROP INDEX `IDX_8aadc209f796bf0fe1d6bc2919` ON `platform_admin_statuses`');
    await queryRunner.query('DROP TABLE `platform_admin_statuses`');
  }
}
