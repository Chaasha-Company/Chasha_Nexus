import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetPasswordCodeFieldForBusinessEmplooyeAndPlatformAdmin1785167640943 implements MigrationInterface {
  name = 'AddResetPasswordCodeFieldForBusinessEmplooyeAndPlatformAdmin1785167640943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `platform_admins` ADD `platform_admin_reset_password_code` varchar(22) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employees` ADD `business_employee_reset_password_code` varchar(22) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employees` ADD UNIQUE INDEX `IDX_bccbea89c1e4a4594297f3aed5` (`business_employee_reset_password_code`)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employees` DROP INDEX `IDX_bccbea89c1e4a4594297f3aed5`');
    await queryRunner.query('ALTER TABLE `business_employees` DROP COLUMN `business_employee_reset_password_code`');
    await queryRunner.query('ALTER TABLE `platform_admins` DROP COLUMN `platform_admin_reset_password_code`');
  }
}
