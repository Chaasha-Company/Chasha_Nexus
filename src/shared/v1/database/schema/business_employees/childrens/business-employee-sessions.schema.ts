import { BusinessEmployeesModel } from '../business-employees.schema';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @ManyToOne(() => BusinessEmployeesModel, (employee) => employee.businessEmployeeSessions, { eager: false })
  @JoinColumn({
    name: 'business_employee_session_user_id',
  })
  businessEmployeeSessionUser!: BusinessEmployeesModel;

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
