import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEarlyAccessRequestCodeField1785687640629 implements MigrationInterface {
  name = 'AddEarlyAccessRequestCodeField1785687640629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `early_access_requests` ADD `early_access_request_code` varchar(14) NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `early_access_requests` DROP COLUMN `early_access_request_code`');
  }
}
