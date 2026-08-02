import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCountryDataField1785700723494 implements MigrationInterface {
  name = 'RemoveCountryDataField1785700723494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `early_access_requests` DROP COLUMN `early_access_request_state`');
    await queryRunner.query('ALTER TABLE `early_access_requests` DROP COLUMN `early_access_request_city`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `early_access_requests` ADD `early_access_request_city` varchar(100) NOT NULL');
    await queryRunner.query('ALTER TABLE `early_access_requests` ADD `early_access_request_state` varchar(100) NOT NULL');
  }
}
