import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { BusinessesModel } from '@/shared/v1/database/schema/businesses';
import { BusinessEmployeesModel } from '@/shared/v1/database/schema/business_employees';
import { BusinessRolePermissionsModel } from './business-role-permissions.schema';

@Entity({
  name: 'business_roles',
})
export class BusinessRolesModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_role_id',
  })
  businessRoleId!: string;

  @Column({
    name: 'business_role_business_id',
    type: 'uuid',
  })
  businessRoleBusinessId!: string;

  @ManyToOne(() => BusinessesModel, (business) => business.businessRoles, { eager: false })
  @JoinColumn({
    name: 'business_role_business_id',
  })
  businessRoleBusiness!: BusinessesModel;

  @OneToMany(() => BusinessEmployeesModel, (businessEmployee) => businessEmployee.businessEmployeeRole, {
    eager: false,
  })
  businessRoleEmployees!: BusinessEmployeesModel[];

  @OneToMany(() => BusinessRolePermissionsModel, (businessRolePermission) => businessRolePermission.businessRolePermissionBusinessRole, {
    eager: false,
  })
  businessRolePermissions!: BusinessRolePermissionsModel[];

  @Column({
    name: 'business_role_key',
    type: 'varchar',
    length: 100,
  })
  businessRoleKey!: string;

  @Column({
    name: 'business_role_name_fa',
    type: 'varchar',
    length: 255,
  })
  businessRoleNameFa!: string;

  @Column({
    name: 'business_role_name_en',
    type: 'varchar',
    length: 255,
  })
  businessRoleNameEn!: string;

  @Column({
    name: 'business_role_description_fa',
    type: 'text',
    nullable: true,
  })
  businessRoleDescriptionFa!: string | null;

  @Column({
    name: 'business_role_description_en',
    type: 'text',
    nullable: true,
  })
  businessRoleDescriptionEn!: string | null;

  @Column({
    name: 'business_role_is_active',
    type: 'boolean',
    default: true,
  })
  businessRoleIsActive!: boolean;

  @CreateDateColumn({
    name: 'business_role_created_at',
    type: 'timestamp',
  })
  businessRoleCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'business_role_updated_at',
    type: 'timestamp',
  })
  businessRoleUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'business_role_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  businessRoleDeletedAt!: Date | null;
}
