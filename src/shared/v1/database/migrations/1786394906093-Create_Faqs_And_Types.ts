import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFaqsAndTypes1786394906093 implements MigrationInterface {
  name = 'CreateFaqsAndTypes1786394906093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `faq_types` (`faq_type_id` int NOT NULL AUTO_INCREMENT, `faq_type_name_fa` varchar(100) NOT NULL, `faq_type_name_en` varchar(100) NOT NULL, `faq_type_slug` varchar(100) NOT NULL, `faq_type_description_fa` text NOT NULL, `faq_type_description_en` text NOT NULL, `faq_type_sort_order` int NOT NULL DEFAULT '0', `faq_type_is_active` tinyint NOT NULL DEFAULT 1, `faq_type_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `faq_type_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `faq_type_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_16b660dd4b2e28c4c63ecbe5fa` (`faq_type_slug`), PRIMARY KEY (`faq_type_id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      "CREATE TABLE `faqs` (`faq_id` int NOT NULL AUTO_INCREMENT, `faq_type_id` int NOT NULL, `faq_question_fa` varchar(500) NOT NULL, `faq_question_en` varchar(500) NOT NULL, `faq_answer_fa` text NOT NULL, `faq_answer_en` text NOT NULL, `faq_slug` varchar(150) NOT NULL, `faq_sort_order` int NOT NULL DEFAULT '0', `faq_is_active` tinyint NOT NULL DEFAULT 1, `faq_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `faq_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `faq_deleted_at` timestamp(6) NULL, UNIQUE INDEX `IDX_f4eab5414023d234813ad1580a` (`faq_slug`), PRIMARY KEY (`faq_id`)) ENGINE=InnoDB",
    );
    await queryRunner.query('ALTER TABLE `faqs` ADD CONSTRAINT `FK_83dce5b02cebe1755ca960fe8cb` FOREIGN KEY (`faq_type_id`) REFERENCES `faq_types`(`faq_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `faqs` DROP FOREIGN KEY `FK_83dce5b02cebe1755ca960fe8cb`');
    await queryRunner.query('DROP INDEX `IDX_f4eab5414023d234813ad1580a` ON `faqs`');
    await queryRunner.query('DROP TABLE `faqs`');
    await queryRunner.query('DROP INDEX `IDX_16b660dd4b2e28c4c63ecbe5fa` ON `faq_types`');
    await queryRunner.query('DROP TABLE `faq_types`');
  }
}
