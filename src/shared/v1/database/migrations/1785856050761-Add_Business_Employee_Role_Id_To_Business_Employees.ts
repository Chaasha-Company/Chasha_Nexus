import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBusinessEmployeeRoleIdToBusinessEmployees1785856050761 implements MigrationInterface {
  name = 'AddBusinessEmployeeRoleIdToBusinessEmployees1785856050761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `business_roles` (`business_role_id` varchar(36) NOT NULL, `business_id` varchar(255) NOT NULL, `business_role_key` varchar(100) NOT NULL, `business_role_name_fa` varchar(255) NOT NULL, `business_role_name_en` varchar(255) NOT NULL, `business_role_description_fa` text NULL, `business_role_description_en` text NULL, `business_role_is_active` tinyint NOT NULL DEFAULT 1, `business_role_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_role_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_role_deleted_at` timestamp(6) NULL, PRIMARY KEY (`business_role_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query('ALTER TABLE `business_employees` ADD `business_employee_role_id` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_roles` ADD CONSTRAINT `FK_ad1acb64f3d42897921e8598b87` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`business_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `business_employees` ADD CONSTRAINT `FK_aaeef3848941a80746057be4c98` FOREIGN KEY (`business_employee_role_id`) REFERENCES `business_roles`(`business_role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employees` DROP FOREIGN KEY `FK_aaeef3848941a80746057be4c98`');
    await queryRunner.query('ALTER TABLE `business_roles` DROP FOREIGN KEY `FK_ad1acb64f3d42897921e8598b87`');
    await queryRunner.query('ALTER TABLE `business_employees` DROP COLUMN `business_employee_role_id`');
    await queryRunner.query('DROP TABLE `business_roles`');
  }
}
