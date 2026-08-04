import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthorizationSystem1785884061495 implements MigrationInterface {
  name = 'CreateAuthorizationSystem1785884061495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `platform_admin_roles` (`platform_admin_role_id` varchar(36) NOT NULL, `platform_admin_role_key` varchar(100) NOT NULL, `platform_admin_role_name_fa` varchar(255) NOT NULL, `platform_admin_role_name_en` varchar(255) NOT NULL, `platform_admin_role_description_fa` text NULL, `platform_admin_role_description_en` text NULL, `platform_admin_role_is_active` tinyint NOT NULL DEFAULT 1, `platform_admin_role_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `platform_admin_role_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `platform_admin_role_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_38f653c8296940731c29bdd06b` (`platform_admin_role_key`), PRIMARY KEY (`platform_admin_role_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `business_role_permissions` (`business_role_permission_id` varchar(36) NOT NULL, `business_role_permission_business_role_id` varchar(255) NOT NULL, `business_role_permission_permission_id` varchar(255) NOT NULL, `business_role_permission_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_role_permission_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_role_permission_deleted_at` timestamp(6) NULL, PRIMARY KEY (`business_role_permission_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `business_roles` (`business_role_id` varchar(36) NOT NULL, `business_role_business_id` varchar(255) NOT NULL, `business_role_key` varchar(100) NOT NULL, `business_role_name_fa` varchar(255) NOT NULL, `business_role_name_en` varchar(255) NOT NULL, `business_role_description_fa` text NULL, `business_role_description_en` text NULL, `business_role_is_active` tinyint NOT NULL DEFAULT 1, `business_role_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_role_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_role_deleted_at` timestamp(6) NULL, PRIMARY KEY (`business_role_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      "CREATE TABLE `permissions` (`permission_id` varchar(36) NOT NULL, `permission_key` varchar(150) NOT NULL, `permission_subject` enum ('platform_admin', 'business_employee') NOT NULL, `permission_version` int NOT NULL DEFAULT '1', `permission_module` varchar(100) NOT NULL, `permission_action` enum ('read', 'create', 'update', 'delete', 'manage', 'approve', 'export') NOT NULL, `permission_type` enum ('page', 'action', 'feature') NOT NULL, `permission_label_fa` varchar(255) NOT NULL, `permission_label_en` varchar(255) NOT NULL, `permission_description_fa` text NULL, `permission_description_en` text NULL, `permission_navigation` json NULL, `permission_is_active` tinyint NOT NULL DEFAULT 1, `permission_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `permission_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `permission_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_3e3b7dd3ed2cf02975cd963bcd` (`permission_key`), PRIMARY KEY (`permission_id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'CREATE TABLE `platform_admin_role_permissions` (`platform_admin_role_permission_id` varchar(36) NOT NULL, `platform_admin_role_permission_role_id` varchar(255) NOT NULL, `platform_admin_role_permission_permission_id` varchar(255) NOT NULL, `platform_admin_role_permission_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `platform_admin_role_permission_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `platform_admin_role_permission_deleted_at` timestamp(6) NULL, PRIMARY KEY (`platform_admin_role_permission_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query('ALTER TABLE `business_employees` ADD `business_employee_role_id` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `platform_admins` ADD `platform_admin_role_id` varchar(255) NOT NULL');
    await queryRunner.query(
      'ALTER TABLE `business_role_permissions` ADD CONSTRAINT `FK_5400419f4f36e77c1f498a838f5` FOREIGN KEY (`business_role_permission_business_role_id`) REFERENCES `business_roles`(`business_role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE `business_role_permissions` ADD CONSTRAINT `FK_572137873d30020d82782ab7552` FOREIGN KEY (`business_role_permission_permission_id`) REFERENCES `permissions`(`permission_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `business_roles` ADD CONSTRAINT `FK_5920bdfea466524cacaa326c2e0` FOREIGN KEY (`business_role_business_id`) REFERENCES `businesses`(`business_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `business_employees` ADD CONSTRAINT `FK_aaeef3848941a80746057be4c98` FOREIGN KEY (`business_employee_role_id`) REFERENCES `business_roles`(`business_role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query(
      'ALTER TABLE `platform_admin_role_permissions` ADD CONSTRAINT `FK_05e2989d3c55536a345dda69ed6` FOREIGN KEY (`platform_admin_role_permission_role_id`) REFERENCES `platform_admin_roles`(`platform_admin_role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `platform_admin_role_permissions` ADD CONSTRAINT `FK_72657f8c959020917908d37a10f` FOREIGN KEY (`platform_admin_role_permission_permission_id`) REFERENCES `permissions`(`permission_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE `platform_admins` ADD CONSTRAINT `FK_840d0f55ef5d912424945fbbea8` FOREIGN KEY (`platform_admin_role_id`) REFERENCES `platform_admin_roles`(`platform_admin_role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `platform_admins` DROP FOREIGN KEY `FK_840d0f55ef5d912424945fbbea8`');
    await queryRunner.query('ALTER TABLE `platform_admin_role_permissions` DROP FOREIGN KEY `FK_72657f8c959020917908d37a10f`');
    await queryRunner.query('ALTER TABLE `platform_admin_role_permissions` DROP FOREIGN KEY `FK_05e2989d3c55536a345dda69ed6`');
    await queryRunner.query('ALTER TABLE `business_employees` DROP FOREIGN KEY `FK_aaeef3848941a80746057be4c98`');
    await queryRunner.query('ALTER TABLE `business_roles` DROP FOREIGN KEY `FK_5920bdfea466524cacaa326c2e0`');
    await queryRunner.query('ALTER TABLE `business_role_permissions` DROP FOREIGN KEY `FK_572137873d30020d82782ab7552`');
    await queryRunner.query('ALTER TABLE `business_role_permissions` DROP FOREIGN KEY `FK_5400419f4f36e77c1f498a838f5`');
    await queryRunner.query('ALTER TABLE `platform_admins` DROP COLUMN `platform_admin_role_id`');
    await queryRunner.query('ALTER TABLE `business_employees` DROP COLUMN `business_employee_role_id`');
    await queryRunner.query('DROP TABLE `platform_admin_role_permissions`');
    await queryRunner.query('DROP INDEX `IDX_3e3b7dd3ed2cf02975cd963bcd` ON `permissions`');
    await queryRunner.query('DROP TABLE `permissions`');
    await queryRunner.query('DROP TABLE `business_roles`');
    await queryRunner.query('DROP TABLE `business_role_permissions`');
    await queryRunner.query('DROP INDEX `IDX_38f653c8296940731c29bdd06b` ON `platform_admin_roles`');
    await queryRunner.query('DROP TABLE `platform_admin_roles`');
  }
}
