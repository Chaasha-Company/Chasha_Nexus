import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PlatformAdminRolePermissionsModel } from './platform-admin-role-permissions.schema';
import { PlatformAdminsModel } from '../../platform-admins.schema';

@Entity({
  name: 'platform_admin_roles',
})
export class PlatformAdminRolesModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'platform_admin_role_id',
  })
  platformAdminRoleId!: string;

  @OneToMany(() => PlatformAdminsModel, (admin) => admin.platformAdminRole, {
    eager: false,
  })
  platformAdminRoleAdmins!: PlatformAdminsModel[];

  @OneToMany(() => PlatformAdminRolePermissionsModel, (permission) => permission.platformAdminRolePermissionRole, {
    eager: false,
  })
  platformAdminRolePermissions!: PlatformAdminRolePermissionsModel[];

  @Column({
    name: 'platform_admin_role_key',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  platformAdminRoleKey!: string;

  @Column({
    name: 'platform_admin_role_name_fa',
    type: 'varchar',
    length: 255,
  })
  platformAdminRoleNameFa!: string;

  @Column({
    name: 'platform_admin_role_name_en',
    type: 'varchar',
    length: 255,
  })
  platformAdminRoleNameEn!: string;

  @Column({
    name: 'platform_admin_role_description_fa',
    type: 'text',
    nullable: true,
  })
  platformAdminRoleDescriptionFa!: string | null;

  @Column({
    name: 'platform_admin_role_description_en',
    type: 'text',
    nullable: true,
  })
  platformAdminRoleDescriptionEn!: string | null;

  @Column({
    name: 'platform_admin_role_is_active',
    type: 'boolean',
    default: true,
  })
  platformAdminRoleIsActive!: boolean;

  @CreateDateColumn({
    name: 'platform_admin_role_created_at',
    type: 'timestamp',
  })
  platformAdminRoleCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'platform_admin_role_updated_at',
    type: 'timestamp',
  })
  platformAdminRoleUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'platform_admin_role_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  platformAdminRoleDeletedAt!: Date | null;
}
