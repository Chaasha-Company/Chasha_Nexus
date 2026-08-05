import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRevokedAtField1785963476815 implements MigrationInterface {
  name = 'AddRevokedAtField1785963476815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` ADD `platform_admin_session_revoked_at` timestamp NULL');
    await queryRunner.query('ALTER TABLE `business_employee_sessions` ADD `business_employee_session_revoked_at` timestamp NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employee_sessions` DROP COLUMN `business_employee_session_revoked_at`');
    await queryRunner.query('ALTER TABLE `platform_admin_sessions` DROP COLUMN `platform_admin_session_revoked_at`');
  }
}
