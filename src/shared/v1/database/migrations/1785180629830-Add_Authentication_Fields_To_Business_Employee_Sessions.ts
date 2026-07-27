import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthenticationFieldsToBusinessEmployeeSessions1785180629830 implements MigrationInterface {
  name = 'AddAuthenticationFieldsToBusinessEmployeeSessions1785180629830';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` ADD `platform_admin_session_refresh_token` varchar(500) NOT NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` ADD `platform_admin_session_ip_address` varchar(45) NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` ADD `platform_admin_session_user_agent` text NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` ADD `platform_admin_session_last_activity_at` timestamp NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` ADD `platform_admin_session_expires_at` timestamp NOT NULL');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` ADD `platform_admin_session_is_active` tinyint NOT NULL DEFAULT 1');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` ADD `business_employee_session_refresh_token` varchar(500) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` ADD `business_employee_session_ip_address` varchar(45) NULL');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` ADD `business_employee_session_user_agent` text NULL');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` ADD `business_employee_session_expires_at` timestamp NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` ADD `business_employee_session_last_activity_at` timestamp NULL');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` ADD `business_employee_session_is_active` tinyint NOT NULL DEFAULT 1');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employee_sessions` DROP COLUMN `business_employee_session_is_active`');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` DROP COLUMN `business_employee_session_last_activity_at`');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` DROP COLUMN `business_employee_session_expires_at`');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` DROP COLUMN `business_employee_session_user_agent`');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` DROP COLUMN `business_employee_session_ip_address`');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` DROP COLUMN `business_employee_session_refresh_token`');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` DROP COLUMN `platform_admin_session_is_active`');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` DROP COLUMN `platform_admin_session_expires_at`');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` DROP COLUMN `platform_admin_session_last_activity_at`');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` DROP COLUMN `platform_admin_session_user_agent`');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` DROP COLUMN `platform_admin_session_ip_address`');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` DROP COLUMN `platform_admin_session_refresh_token`');
  }
}
