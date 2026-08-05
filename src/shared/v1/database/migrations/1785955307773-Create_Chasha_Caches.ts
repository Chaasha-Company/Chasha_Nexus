import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChashaCaches1785955307773 implements MigrationInterface {
  name = 'CreateChashaCaches1785955307773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `chasha_caches` (`id` int NOT NULL AUTO_INCREMENT, `identifier` varchar(255) NULL, `time` bigint NOT NULL, `duration` int NOT NULL, `query` text NOT NULL, `result` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `chasha_caches`');
  }
}
