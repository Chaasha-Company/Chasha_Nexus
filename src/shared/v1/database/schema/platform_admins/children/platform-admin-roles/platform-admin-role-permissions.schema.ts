import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PlatformAdminRolesModel } from './platform-admin-roles.schema';
import { PermissionsModel } from '@/shared/v1/database/schema/permissions';

@Entity({
  name: 'platform_admin_role_permissions',
})
export class PlatformAdminRolePermissionsModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'platform_admin_role_permission_id',
  })
  platformAdminRolePermissionId!: string;

  @Column({
    name: 'platform_admin_role_permission_role_id',
    type: 'uuid',
  })
  platformAdminRolePermissionRoleId!: string;

  @ManyToOne(() => PlatformAdminRolesModel, (role) => role.platformAdminRolePermissions, {
    eager: false,
  })
  @JoinColumn({
    name: 'platform_admin_role_permission_role_id',
  })
  platformAdminRolePermissionRole!: PlatformAdminRolesModel;

  @Column({
    name: 'platform_admin_role_permission_permission_id',
    type: 'uuid',
  })
  platformAdminRolePermissionPermissionId!: string;

  @ManyToOne(() => PermissionsModel, {
    eager: false,
  })
  @JoinColumn({
    name: 'platform_admin_role_permission_permission_id',
  })
  platformAdminRolePermissionPermission!: PermissionsModel;

  @CreateDateColumn({
    name: 'platform_admin_role_permission_created_at',
    type: 'timestamp',
  })
  platformAdminRolePermissionCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'platform_admin_role_permission_updated_at',
    type: 'timestamp',
  })
  platformAdminRolePermissionUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'platform_admin_role_permission_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  platformAdminRolePermissionDeletedAt!: Date | null;
}
