import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinessEmployeesWithStatus1785161604549 implements MigrationInterface {
  name = 'CreateBusinessEmployeesWithStatus1785161604549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `business_employee_statuses` (`business_employee_status_id` varchar(36) NOT NULL, `business_employee_status_name` varchar(100) NOT NULL, `business_employee_status_slug` varchar(100) NOT NULL, `business_employee_status_description` text NULL, `business_employee_status_sort_order` int NOT NULL DEFAULT '0', `business_employee_status_is_system` tinyint NOT NULL DEFAULT 1, `business_employee_status_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_employee_status_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_employee_status_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_600ec5fc850983874b54064ce4` (`business_employee_status_slug`), PRIMARY KEY (`business_employee_status_id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'CREATE TABLE `business_employees` (`business_employee_id` varchar(36) NOT NULL, `business_employee_status_id` varchar(255) NOT NULL, `business_employee_code` varchar(50) NOT NULL, `business_employee_first_name` varchar(100) NOT NULL, `business_employee_last_name` varchar(100) NOT NULL, `business_employee_national_code` varchar(20) NOT NULL, `business_employee_phone_number` varchar(20) NOT NULL, `business_employee_birth_date` date NULL, `business_employee_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_employee_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_employee_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_ce9485952c592b5eb27263b470` (`business_employee_code`), UNIQUE INDEX `IDX_f6b63c61530b2ca4a89e944476` (`business_employee_national_code`), UNIQUE INDEX `IDX_a455d53a5c9f101b4a58303c94` (`business_employee_phone_number`), PRIMARY KEY (`business_employee_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `business_employees` ADD CONSTRAINT `FK_bd397734ba9696c84952b1f3287` FOREIGN KEY (`business_employee_status_id`) REFERENCES `business_employee_statuses`(`business_employee_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employees` DROP FOREIGN KEY `FK_bd397734ba9696c84952b1f3287`');
    await queryRunner.query('DROP INDEX `IDX_a455d53a5c9f101b4a58303c94` ON `business_employees`');
    await queryRunner.query('DROP INDEX `IDX_f6b63c61530b2ca4a89e944476` ON `business_employees`');
    await queryRunner.query('DROP INDEX `IDX_ce9485952c592b5eb27263b470` ON `business_employees`');
    await queryRunner.query('DROP TABLE `business_employees`');
    await queryRunner.query('DROP INDEX `IDX_600ec5fc850983874b54064ce4` ON `business_employee_statuses`');
    await queryRunner.query('DROP TABLE `business_employee_statuses`');
  }
}
