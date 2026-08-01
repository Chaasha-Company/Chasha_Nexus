import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinesses1785599803000 implements MigrationInterface {
  name = 'CreateBusinesses1785599803000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `businesses` (`business_id` varchar(36) NOT NULL, `business_name` varchar(255) NOT NULL, `business_slug` varchar(255) NOT NULL, `business_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_bcfd371d5e0204ad63bfada066` (`business_slug`), PRIMARY KEY (`business_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query('ALTER TABLE `business_employees` ADD `business_employee_business_id` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `business_employees` ADD CONSTRAINT `FK_910b7b29f9fd2adc56ad5cfd32c` FOREIGN KEY (`business_employee_business_id`) REFERENCES `businesses`(`business_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `business_employees` DROP FOREIGN KEY `FK_910b7b29f9fd2adc56ad5cfd32c`');
    await queryRunner.query('ALTER TABLE `business_employees` DROP COLUMN `business_employee_business_id`');
    await queryRunner.query('DROP INDEX `IDX_bcfd371d5e0204ad63bfada066` ON `businesses`');
    await queryRunner.query('DROP TABLE `businesses`');
  }
}
