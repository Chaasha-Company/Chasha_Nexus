import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';
import { BusinessTypesModel } from './childrens';
import { BusinessRolesModel } from './childrens/business-roles';

@Entity({
  name: 'businesses',
})
export class BusinessesModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_id',
  })
  businessId!: string;

  @Column({
    name: 'business_name',
    type: 'varchar',
    length: 255,
  })
  businessName!: string;

  @Column({
    name: 'business_slug',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  businessSlug!: string;

  @OneToMany(() => BusinessEmployeesModel, (businessEmployee) => businessEmployee.businessEmployeeBusiness, { eager: false })
  businessEmployees!: BusinessEmployeesModel[];

  @OneToMany(() => BusinessRolesModel, (businessRole) => businessRole.businessRoleBusiness, { eager: false })
  businessRoles!: BusinessRolesModel[];

  @Column({
    name: 'business_type_id',
    type: 'uuid',
  })
  businessTypeId!: number;

  @ManyToOne(() => BusinessTypesModel, (businessType) => businessType.businessTypeBusinesses, { eager: false })
  @JoinColumn({
    name: 'business_type_id',
  })
  businessType!: BusinessTypesModel;

  @CreateDateColumn({
    name: 'business_created_at',
    type: 'timestamp',
  })
  businessCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'business_updated_at',
    type: 'timestamp',
  })
  businessUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'business_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  businessDeletedAt!: Date | null;
}
