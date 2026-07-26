import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCusbinRule1785098891773 implements MigrationInterface {
  name = 'CreateCusbinRule1785098891773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `casbin_rule` (`id` int NOT NULL AUTO_INCREMENT, `ptype` varchar(255) NULL, `v0` varchar(255) NULL, `v1` varchar(255) NULL, `v2` varchar(255) NULL, `v3` varchar(255) NULL, `v4` varchar(255) NULL, `v5` varchar(255) NULL, `v6` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `casbin_rule`');
  }
}
