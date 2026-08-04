import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinessRolePermissions1785879259366 implements MigrationInterface {
  name = 'CreateBusinessRolePermissions1785879259366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `business_role_permissions` (`business_role_permission_id` varchar(36) NOT NULL, `business_role_permission_business_role_id` varchar(255) NOT NULL, `business_role_permission_permission_id` varchar(255) NOT NULL, `business_role_permission_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_role_permission_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_role_permission_deleted_at` timestamp(6) NULL, PRIMARY KEY (`business_role_permission_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `business_roles` (`business_role_id` varchar(36) NOT NULL, `business_role_business_id` varchar(255) NOT NULL, `business_role_key` varchar(100) NOT NULL, `business_role_name_fa` varchar(255) NOT NULL, `business_role_name_en` varchar(255) NOT NULL, `business_role_description_fa` text NULL, `business_role_description_en` text NULL, `business_role_is_active` tinyint NOT NULL DEFAULT 1, `business_role_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_role_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_role_deleted_at` timestamp(6) NULL, PRIMARY KEY (`business_role_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query('ALTER TABLE `business_employees` ADD `business_employee_role_id` varchar(255) NOT NULL');
    await queryRunner.query(
      'ALTER TABLE `business_role_permissions` ADD CONSTRAINT `FK_5400419f4f36e77c1f498a838f5` FOREIGN KEY (`business_role_permission_business_role_id`) REFERENCES `business_roles`(`business_role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE `business_role_permissions` ADD CONSTRAINT `FK_572137873d30020d82782ab7552` FOREIGN KEY (`business_role_permission_permission_id`) REFERENCES `permissions`(`permission_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `business_roles` ADD CONSTRAINT `FK_5920bdfea466524cacaa326c2e0` FOREIGN KEY (`business_role_business_id`) REFERENCES `businesses`(`business_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `business_employees` ADD CONSTRAINT `FK_aaeef3848941a80746057be4c98` FOREIGN KEY (`business_employee_role_id`) REFERENCES `business_roles`(`business_role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employees` DROP FOREIGN KEY `FK_aaeef3848941a80746057be4c98`');
    await queryRunner.query('ALTER TABLE `business_roles` DROP FOREIGN KEY `FK_5920bdfea466524cacaa326c2e0`');
    await queryRunner.query('ALTER TABLE `business_role_permissions` DROP FOREIGN KEY `FK_572137873d30020d82782ab7552`');
    await queryRunner.query('ALTER TABLE `business_role_permissions` DROP FOREIGN KEY `FK_5400419f4f36e77c1f498a838f5`');
    await queryRunner.query('ALTER TABLE `business_employees` DROP COLUMN `business_employee_role_id`');
    await queryRunner.query('DROP TABLE `business_roles`');
    await queryRunner.query('DROP TABLE `business_role_permissions`');
  }
}
