import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinessCustomers1785162096990 implements MigrationInterface {
  name = 'CreateBusinessCustomers1785162096990';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `business_customers` (`business_customer_id` varchar(36) NOT NULL, `business_customer_first_name` varchar(100) NOT NULL, `business_customer_last_name` varchar(100) NOT NULL, `business_customer_phone_number` varchar(20) NOT NULL, `business_customer_created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `business_customer_updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `business_customer_deleted_at` timestamp(6) NULL, PRIMARY KEY (`business_customer_id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `business_customers`');
  }
}
