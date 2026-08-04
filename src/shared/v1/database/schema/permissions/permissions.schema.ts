import { PermissionActionEnum, PermissionTypeEnum } from '@/modules/v1/authorizations/domain';
import { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/childrens';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'permissions',
})
export class PermissionsModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'permission_id',
  })
  permissionId!: string;

  @OneToMany(() => BusinessRolePermissionsModel, (businessRolePermission) => businessRolePermission.businessRolePermissionPermission, {
    eager: false,
  })
  permissionBusinessRolePermissions!: BusinessRolePermissionsModel[];

  @Column({
    name: 'permission_key',
    type: 'varchar',
    length: 150,
    unique: true,
  })
  permissionKey!: string;

  @Column({
    name: 'permission_version',
    type: 'int',
    default: 1,
  })
  permissionVersion!: number;

  @Column({
    name: 'permission_module',
    type: 'varchar',
    length: 100,
  })
  permissionModule!: string;

  @Column({
    name: 'permission_action',
    type: 'enum',
    enum: PermissionActionEnum,
  })
  permissionAction!: PermissionActionEnum;

  @Column({
    name: 'permission_type',
    type: 'enum',
    enum: PermissionTypeEnum,
  })
  permissionType!: PermissionTypeEnum;

  @Column({
    name: 'permission_label_fa',
    type: 'varchar',
    length: 255,
  })
  permissionLabelFa!: string;

  @Column({
    name: 'permission_label_en',
    type: 'varchar',
    length: 255,
  })
  permissionLabelEn!: string;

  @Column({
    name: 'permission_description_fa',
    type: 'text',
    nullable: true,
  })
  permissionDescriptionFa!: string | null;

  @Column({
    name: 'permission_description_en',
    type: 'text',
    nullable: true,
  })
  permissionDescriptionEn!: string | null;

  @Column({
    name: 'permission_navigation',
    type: 'json',
    nullable: true,
  })
  permissionNavigation!: {
    permissionNavigationVisible: boolean;

    permissionNavigationGroupKey?: string;

    permissionNavigationGroupLabelFa?: string;

    permissionNavigationGroupLabelEn?: string;

    permissionNavigationParentKey?: string | null;

    permissionNavigationLabelFa?: string;

    permissionNavigationLabelEn?: string;

    permissionNavigationPath?: string;

    permissionNavigationIcon?: string;

    permissionNavigationOrder?: number;
  } | null;

  @Column({
    name: 'permission_is_active',
    type: 'boolean',
    default: true,
  })
  permissionIsActive!: boolean;

  @CreateDateColumn({
    name: 'permission_created_at',
    type: 'timestamp',
  })
  permissionCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'permission_updated_at',
    type: 'timestamp',
  })
  permissionUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'permission_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  permissionDeletedAt!: Date | null;
}
