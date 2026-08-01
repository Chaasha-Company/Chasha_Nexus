import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMultiLanguageRemoveUUIDForStatuessCreateBusinessTypes1785613559506 implements MigrationInterface {
  name = 'AddMultiLanguageRemoveUUIDForStatuessCreateBusinessTypes1785613559506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `business_types` (`business_type_id` varchar(36) NOT NULL, `business_type_name_fa` varchar(100) NOT NULL, `business_type_name_en` varchar(100) NOT NULL, `business_type_slug` varchar(100) NOT NULL, `business_type_sort_order` int NOT NULL DEFAULT '0', `business_type_is_active` tinyint NOT NULL DEFAULT 1, `business_type_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_type_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_type_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_e22b6f3c9c50602d1985612262` (`business_type_name_fa`), UNIQUE INDEX `IDX_ab9882af47bcb544886425735c` (`business_type_name_en`), UNIQUE INDEX `IDX_74c2e84e82e4a17a71cad7d0fd` (`business_type_slug`), PRIMARY KEY (`business_type_id`)) ENGINE=InnoDB",
    );
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` DROP COLUMN `platform_admin_status_name`');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` DROP COLUMN `platform_admin_status_description`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` DROP COLUMN `business_employee_status_name`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` DROP COLUMN `business_employee_status_description`');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` ADD `platform_admin_status_name_fa` varchar(100) NOT NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` ADD `platform_admin_status_name_en` varchar(100) NOT NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` ADD `platform_admin_status_description_en` text NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` ADD `platform_admin_status_description_fa` text NULL');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` ADD `business_employee_status_name_fa` varchar(100) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` ADD `business_employee_status_name_en` varchar(100) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` ADD `business_employee_status_description_en` text NULL');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` ADD `business_employee_status_description_fa` text NULL');
    await queryRunner.query('ALTER TABLE `businesses` ADD `business_type_id` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `platform_admins` DROP FOREIGN KEY `FK_d53982a725eb6c9cddd781346a7`');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` DROP PRIMARY KEY');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` DROP COLUMN `platform_admin_status_id`');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` ADD `platform_admin_status_id` int NOT NULL PRIMARY KEY AUTO_INCREMENT');
    await queryRunner.query('ALTER TABLE `business_employees` DROP FOREIGN KEY `FK_bd397734ba9696c84952b1f3287`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` DROP PRIMARY KEY');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` DROP COLUMN `business_employee_status_id`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` ADD `business_employee_status_id` int NOT NULL PRIMARY KEY AUTO_INCREMENT');
    await queryRunner.query('ALTER TABLE `business_employees` DROP COLUMN `business_employee_status_id`');
    await queryRunner.query('ALTER TABLE `business_employees` ADD `business_employee_status_id` int NOT NULL');
    await queryRunner.query('ALTER TABLE `platform_admins` DROP COLUMN `platform_admin_status_id`');
    await queryRunner.query('ALTER TABLE `platform_admins` ADD `platform_admin_status_id` int NOT NULL');
    await queryRunner.query('ALTER TABLE `businesses` ADD CONSTRAINT `FK_73094057b7c5ab456deb2b75d77` FOREIGN KEY (`business_type_id`) REFERENCES `business_types`(`business_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query(
      'ALTER TABLE `business_employees` ADD CONSTRAINT `FK_bd397734ba9696c84952b1f3287` FOREIGN KEY (`business_employee_status_id`) REFERENCES `business_employee_statuses`(`business_employee_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE `platform_admins` ADD CONSTRAINT `FK_d53982a725eb6c9cddd781346a7` FOREIGN KEY (`platform_admin_status_id`) REFERENCES `platform_admin_statuses`(`platform_admin_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `platform_admins` DROP FOREIGN KEY `FK_d53982a725eb6c9cddd781346a7`');
    await queryRunner.query('ALTER TABLE `business_employees` DROP FOREIGN KEY `FK_bd397734ba9696c84952b1f3287`');
    await queryRunner.query('ALTER TABLE `businesses` DROP FOREIGN KEY `FK_73094057b7c5ab456deb2b75d77`');
    await queryRunner.query('ALTER TABLE `platform_admins` DROP COLUMN `platform_admin_status_id`');
    await queryRunner.query('ALTER TABLE `platform_admins` ADD `platform_admin_status_id` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employees` DROP COLUMN `business_employee_status_id`');
    await queryRunner.query('ALTER TABLE `business_employees` ADD `business_employee_status_id` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` DROP COLUMN `business_employee_status_id`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` ADD `business_employee_status_id` varchar(36) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` ADD PRIMARY KEY (`business_employee_status_id`)');
    await queryRunner.query(
      'ALTER TABLE `business_employees` ADD CONSTRAINT `FK_bd397734ba9696c84952b1f3287` FOREIGN KEY (`business_employee_status_id`) REFERENCES `business_employee_statuses`(`business_employee_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` DROP COLUMN `platform_admin_status_id`');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` ADD `platform_admin_status_id` varchar(36) NOT NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` ADD PRIMARY KEY (`platform_admin_status_id`)');
    await queryRunner.query('ALTER TABLE `platform_admins` ADD CONSTRAINT `FK_d53982a725eb6c9cddd781346a7` FOREIGN KEY (`platform_admin_status_id`) REFERENCES `platform_admin_statuses`(`platform_admin_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `businesses` DROP COLUMN `business_type_id`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` DROP COLUMN `business_employee_status_description_fa`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` DROP COLUMN `business_employee_status_description_en`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` DROP COLUMN `business_employee_status_name_en`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` DROP COLUMN `business_employee_status_name_fa`');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` DROP COLUMN `platform_admin_status_description_fa`');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` DROP COLUMN `platform_admin_status_description_en`');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` DROP COLUMN `platform_admin_status_name_en`');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` DROP COLUMN `platform_admin_status_name_fa`');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` ADD `business_employee_status_description` text NULL');
    await queryRunner.query('ALTER TABLE `business_employee_statuses` ADD `business_employee_status_name` varchar(100) NOT NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` ADD `platform_admin_status_description` text NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_statuses` ADD `platform_admin_status_name` varchar(100) NOT NULL');
    await queryRunner.query('DROP INDEX `IDX_74c2e84e82e4a17a71cad7d0fd` ON `business_types`');
    await queryRunner.query('DROP INDEX `IDX_ab9882af47bcb544886425735c` ON `business_types`');
    await queryRunner.query('DROP INDEX `IDX_e22b6f3c9c50602d1985612262` ON `business_types`');
    await queryRunner.query('DROP TABLE `business_types`');
  }
}
