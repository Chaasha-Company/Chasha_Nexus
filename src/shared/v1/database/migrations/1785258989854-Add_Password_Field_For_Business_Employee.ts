import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordFieldForBusinessEmployee1785258989854 implements MigrationInterface {
  name = 'AddPasswordFieldForBusinessEmployee1785258989854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employees` ADD `business_employee_password` varchar(64) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employees` ADD UNIQUE INDEX `IDX_7ecd137c5249db0e04b5d0961d` (`business_employee_password`)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employees` DROP INDEX `IDX_7ecd137c5249db0e04b5d0961d`');
    await queryRunner.query('ALTER TABLE `business_employees` DROP COLUMN `business_employee_password`');
  }
}
