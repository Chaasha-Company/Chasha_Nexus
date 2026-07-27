import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { BusinessEmployeesModel } from '../business-employees.schema';

@Entity({
  name: 'business_employee_statuses',
})
export class BusinessEmployeeStatusesModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_employee_status_id',
  })
  businessEmployeeStatusId!: string;

  @Column({
    name: 'business_employee_status_name',
    type: 'varchar',
    length: 100,
  })
  businessEmployeeStatusName!: string;

  @Column({
    name: 'business_employee_status_slug',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  businessEmployeeStatusSlug!: string;

  @Column({
    name: 'business_employee_status_description',
    type: 'text',
    nullable: true,
  })
  businessEmployeeStatusDescription!: string | null;

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

  /**
   * Relation:
   * business_employee_statuses.business_employee_status_id
   *        |
   *        ↓
   * business_employees.business_employee_status_id
   */
  @OneToMany(() => BusinessEmployeesModel, (businessEmployee) => businessEmployee.businessEmployeeStatus, {
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
