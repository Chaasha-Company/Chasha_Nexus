import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BusinessEmployeeSessionsModel, BusinessEmployeeStatusesModel } from './childrens';
import { BusinessesModel } from '@/shared/v1/database/schema/businesses';
import { generateChashaResetPasswordCodeHelper, hashPasswordProvider } from '@/modules/v1/auth';

@Entity({
  name: 'business_employees',
})
export class BusinessEmployeesModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_employee_id',
  })
  businessEmployeeId!: string;

  @Column({
    name: 'business_employee_status_id',
    type: 'uuid',
  })
  businessEmployeeStatusId!: string;

  @ManyToOne(() => BusinessEmployeeStatusesModel, (status) => status.businessEmployees)
  @JoinColumn({
    name: 'business_employee_status_id',
  })
  businessEmployeeStatus!: BusinessEmployeeStatusesModel;

  @Column({
    name: 'business_employee_business_id',
    type: 'uuid',
  })
  businessEmployeeBusinessId!: string;

  @ManyToOne(() => BusinessesModel, (business) => business.businessEmployees, { eager: false })
  @JoinColumn({
    name: 'business_employee_business_id',
  })
  businessEmployeeBusiness!: BusinessesModel;

  @OneToMany(() => BusinessEmployeeSessionsModel, (session) => session.businessEmployeeSessionUser, { eager: false })
  businessEmployeeSessions!: BusinessEmployeeSessionsModel[];

  @Column({
    name: 'business_employee_code',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  businessEmployeeCode!: string;

  @Column({
    name: 'business_employee_password',
    type: 'varchar',
    length: 64,
    unique: true,
  })
  businessEmployeePassword!: string;

  @Column({
    name: 'business_employee_reset_password_code',
    type: 'varchar',
    length: 22,
    unique: true,
  })
  businessEmployeeResetPasswordCode!: string;

  @Column({
    name: 'business_employee_first_name',
    type: 'varchar',
    length: 100,
  })
  businessEmployeeFirstName!: string;

  @Column({
    name: 'business_employee_last_name',
    type: 'varchar',
    length: 100,
  })
  businessEmployeeLastName!: string;

  @Column({
    name: 'business_employee_national_code',
    type: 'varchar',
    length: 20,
    unique: true,
  })
  businessEmployeeNationalCode!: string;

  @Column({
    name: 'business_employee_phone_number',
    type: 'varchar',
    length: 20,
    unique: true,
  })
  businessEmployeePhoneNumber!: string;

  @Column({
    name: 'business_employee_birth_date',
    type: 'date',
    nullable: true,
  })
  businessEmployeeBirthDate!: Date | null;

  @CreateDateColumn({
    name: 'business_employee_created_at',
    type: 'timestamp',
  })
  businessEmployeeCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'business_employee_updated_at',
    type: 'timestamp',
  })
  businessEmployeeUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'business_employee_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  businessEmployeeDeletedAt!: Date | null;

  @BeforeInsert()
  async hashPasswordOnInsert(): Promise<void> {
    if (this.businessEmployeePassword) {
      const hashPassword = hashPasswordProvider();
      this.businessEmployeePassword = await hashPassword(this.businessEmployeePassword);
      this.businessEmployeeResetPasswordCode = generateChashaResetPasswordCodeHelper();
    }
  }
}
