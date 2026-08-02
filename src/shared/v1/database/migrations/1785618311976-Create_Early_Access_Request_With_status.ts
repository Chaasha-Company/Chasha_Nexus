import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEarlyAccessRequestWithStatus1785618311976 implements MigrationInterface {
  name = 'CreateEarlyAccessRequestWithStatus1785618311976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `early_access_request_statuses` (`early_access_request_status_id` int NOT NULL AUTO_INCREMENT, `early_access_request_status_name_fa` varchar(100) NOT NULL, `early_access_request_status_name_en` varchar(100) NOT NULL, `early_access_request_status_slug` varchar(100) NOT NULL, `early_access_request_status_description_fa` text NULL, `early_access_request_status_description_en` text NULL, `early_access_request_status_sort_order` int NOT NULL DEFAULT '0', `early_access_request_status_is_system` tinyint NOT NULL DEFAULT 1, `early_access_request_status_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `early_access_request_status_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `early_access_request_status_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_21804cbaee285af1533bc951ee` (`early_access_request_status_slug`), PRIMARY KEY (`early_access_request_status_id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'CREATE TABLE `early_access_requests` (`early_access_request_id` varchar(36) NOT NULL, `early_access_request_status_id` int NOT NULL, `early_access_request_business_type_id` varchar(255) NOT NULL, `early_access_request_full_name` varchar(150) NOT NULL, `early_access_request_phone_number` varchar(20) NOT NULL, `early_access_request_state` varchar(100) NOT NULL, `early_access_request_city` varchar(100) NOT NULL, `early_access_request_metadata` json NULL, `early_access_request_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `early_access_request_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `early_access_request_deleted_at` timestamp(6) NULL, PRIMARY KEY (`early_access_request_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `early_access_requests` ADD CONSTRAINT `FK_552845380bb55536989d8bfd7b6` FOREIGN KEY (`early_access_request_status_id`) REFERENCES `early_access_request_statuses`(`early_access_request_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE `early_access_requests` ADD CONSTRAINT `FK_321196fbcecd397d08c814efd10` FOREIGN KEY (`early_access_request_business_type_id`) REFERENCES `business_types`(`business_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `early_access_requests` DROP FOREIGN KEY `FK_321196fbcecd397d08c814efd10`');
    await queryRunner.query('ALTER TABLE `early_access_requests` DROP FOREIGN KEY `FK_552845380bb55536989d8bfd7b6`');
    await queryRunner.query('DROP TABLE `early_access_requests`');
    await queryRunner.query('DROP INDEX `IDX_21804cbaee285af1533bc951ee` ON `early_access_request_statuses`');
    await queryRunner.query('DROP TABLE `early_access_request_statuses`');
  }
}
