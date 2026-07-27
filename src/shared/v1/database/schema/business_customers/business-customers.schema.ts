import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'business_customers',
})
export class BusinessCustomersModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_customer_id',
  })
  businessCustomerId!: string;

  @Column({
    name: 'business_customer_first_name',
    type: 'varchar',
    length: 100,
  })
  businessCustomerFirstName!: string;

  @Column({
    name: 'business_customer_last_name',
    type: 'varchar',
    length: 100,
  })
  businessCustomerLastName!: string;

  @Column({
    name: 'business_customer_phone_number',
    type: 'varchar',
    length: 20,
  })
  businessCustomerPhoneNumber!: string;

  @CreateDateColumn({
    name: 'business_customer_created_at',
    type: 'timestamp',
  })
  businessCustomerCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'business_customer_updated_at',
    type: 'timestamp',
  })
  businessCustomerUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'business_customer_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  businessCustomerDeletedAt!: Date | null;
}
