import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { BusinessEmployeesModel } from '../business-employees.schema';

@Entity({
  name: 'business_employee_sessions',
})
export class BusinessEmployeeSessionsModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_employee_session_id',
  })
  businessEmployeeSessionId!: string;

  @Column({
    name: 'business_employee_session_user_id',
    type: 'uuid',
  })
  businessEmployeeSessionUserId!: string;

  @ManyToOne(() => BusinessEmployeesModel, (employee) => employee.businessEmployeeSessions, {
    eager: false,
  })
  @JoinColumn({
    name: 'business_employee_session_user_id',
  })
  businessEmployeeSessionUser!: BusinessEmployeesModel;

  @Column({
    name: 'business_employee_session_refresh_token',
    type: 'varchar',
    length: 500,
  })
  businessEmployeeSessionRefreshToken!: string;

  @Column({
    name: 'business_employee_session_ip_address',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  businessEmployeeSessionIpAddress!: string | null;

  @Column({
    name: 'business_employee_session_user_agent',
    type: 'text',
    nullable: true,
  })
  businessEmployeeSessionUserAgent!: string | null;

  @Column({
    name: 'business_employee_session_expires_at',
    type: 'timestamp',
  })
  businessEmployeeSessionExpiresAt!: Date;

  @Column({
    name: 'business_employee_session_last_activity_at',
    type: 'timestamp',
    nullable: true,
  })
  businessEmployeeSessionLastActivityAt!: Date | null;

  @Column({
    name: 'business_employee_session_is_active',
    type: 'boolean',
    default: true,
  })
  businessEmployeeSessionIsActive!: boolean;

  @CreateDateColumn({
    name: 'business_employee_session_created_at',
    type: 'timestamp',
  })
  businessEmployeeSessionCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'business_employee_session_updated_at',
    type: 'timestamp',
  })
  businessEmployeeSessionUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'business_employee_session_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  businessEmployeeSessionDeletedAt!: Date | null;
}
