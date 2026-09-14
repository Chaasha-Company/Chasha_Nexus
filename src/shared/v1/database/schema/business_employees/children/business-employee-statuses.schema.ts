import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { BusinessEmployeesModel } from '../business-employees.schema';

@Entity({
  name: 'business_employee_statuses',
})
export class BusinessEmployeeStatusesModel {
  @PrimaryGeneratedColumn('increment', {
    name: 'business_employee_status_id',
  })
  businessEmployeeStatusId!: number;

  @Column({
    name: 'business_employee_status_name_fa',
    type: 'varchar',
    length: 100,
  })
  businessEmployeeStatusNameFa!: string;

  @Column({
    name: 'business_employee_status_name_en',
    type: 'varchar',
    length: 100,
  })
  businessEmployeeStatusNameEn!: string;

  @Column({
    name: 'business_employee_status_slug',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  businessEmployeeStatusSlug!: string;

  @Column({
    name: 'business_employee_status_description_en',
    type: 'text',
    nullable: true,
  })
  businessEmployeeStatusDescriptionEn!: string | null;

  @Column({
    name: 'business_employee_status_description_fa',
    type: 'text',
    nullable: true,
  })
  businessEmployeeStatusDescriptionFa!: string | null;

  @Column({
    name: 'business_employee_status_sort_order',
    type: 'integer',
    default: 0,
  })
  businessEmployeeStatusSortOrder!: number;

  @Column({
    name: 'business_employee_status_is_system',
    type: 'boolean',
    default: true,
  })
  businessEmployeeStatusIsSystem!: boolean;

  @OneToMany(() => BusinessEmployeesModel, (emloyee) => emloyee.businessEmployeeStatus, {
    eager: false,
  })
  businessEmployees!: BusinessEmployeesModel[];

  @CreateDateColumn({
    name: 'business_employee_status_created_at',
    type: 'timestamp',
  })
  businessEmployeeStatusCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'business_employee_status_updated_at',
    type: 'timestamp',
  })
  businessEmployeeStatusUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'business_employee_status_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  businessEmployeeStatusDeletedAt!: Date | null;
}
