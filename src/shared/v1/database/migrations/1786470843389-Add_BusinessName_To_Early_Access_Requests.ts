import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBusinessNameToEarlyAccessRequests1786470843389 implements MigrationInterface {
  name = 'AddBusinessNameToEarlyAccessRequests1786470843389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `early_access_requests` ADD `early_access_request_business_name` varchar(150) NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `early_access_requests` DROP COLUMN `early_access_request_business_name`');
  }
}
