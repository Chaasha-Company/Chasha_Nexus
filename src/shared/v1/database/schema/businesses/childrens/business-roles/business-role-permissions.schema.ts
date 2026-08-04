import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/childrens/business-roles';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';

@Entity({
  name: 'business_role_permissions',
})
export class BusinessRolePermissionsModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_role_permission_id',
  })
  businessRolePermissionId!: string;

  @Column({
    name: 'business_role_permission_business_role_id',
    type: 'uuid',
  })
  businessRolePermissionBusinessRoleId!: string;

  @ManyToOne(() => BusinessRolesModel, (businessRole) => businessRole.businessRolePermissions, {
    eager: false,
  })
  @JoinColumn({
    name: 'business_role_permission_business_role_id',
  })
  businessRolePermissionBusinessRole!: BusinessRolesModel;

  @Column({
    name: 'business_role_permission_permission_id',
    type: 'uuid',
  })
  businessRolePermissionPermissionId!: string;

  @ManyToOne(() => PermissionsModel, (permission) => permission.permissionBusinessRolePermissions, {
    eager: false,
  })
  @JoinColumn({
    name: 'business_role_permission_permission_id',
  })
  businessRolePermissionPermission!: PermissionsModel;

  @CreateDateColumn({
    name: 'business_role_permission_created_at',
    type: 'timestamp',
  })
  businessRolePermissionCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'business_role_permission_updated_at',
    type: 'timestamp',
  })
  businessRolePermissionUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'business_role_permission_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  businessRolePermissionDeletedAt!: Date | null;
}
