import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSessionsForBusinessEmployeesAndPlatformAdmins1785179949938 implements MigrationInterface {
  name = 'CreateSessionsForBusinessEmployeesAndPlatformAdmins1785179949938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `platform_admin_sessions` (`platform_admin_session_id` varchar(36) NOT NULL, `platform_admin_session_user_id` varchar(255) NOT NULL, `platform_admin_session_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `platform_admin_session_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `platform_admin_session_deleted_at` timestamp(6) NULL, PRIMARY KEY (`platform_admin_session_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `business_employee_sessions` (`business_employee_session_id` varchar(36) NOT NULL, `business_employee_session_user_id` varchar(255) NOT NULL, `business_employee_session_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_employee_session_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_employee_session_deleted_at` timestamp(6) NULL, PRIMARY KEY (`business_employee_session_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` ADD CONSTRAINT `FK_2af00223282959c86ed6ea9140a` FOREIGN KEY (`platform_admin_session_user_id`) REFERENCES `platform_admins`(`platform_admin_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query(
      'ALTER TABLE `business_employee_sessions` ADD CONSTRAINT `FK_30ebda6c76d6d21503ae870f1f3` FOREIGN KEY (`business_employee_session_user_id`) REFERENCES `business_employees`(`business_employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employee_sessions` DROP FOREIGN KEY `FK_30ebda6c76d6d21503ae870f1f3`');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` DROP FOREIGN KEY `FK_2af00223282959c86ed6ea9140a`');
    await queryRunner.query('ALTER TABLE `business_employees` DROP INDEX `IDX_bccbea89c1e4a4594297f3aed5`');
    await queryRunner.query('DROP TABLE `business_employee_sessions`');
    await queryRunner.query('DROP TABLE `platform_admin_sessions`');
  }
}
