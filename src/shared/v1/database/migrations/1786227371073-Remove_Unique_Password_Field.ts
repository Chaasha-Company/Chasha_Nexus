import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniquePasswordField1786227371073 implements MigrationInterface {
  name = 'RemoveUniquePasswordField1786227371073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_7ecd137c5249db0e04b5d0961d` ON `business_employees`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE UNIQUE INDEX `IDX_7ecd137c5249db0e04b5d0961d` ON `business_employees` (`business_employee_password`)');
  }
}
