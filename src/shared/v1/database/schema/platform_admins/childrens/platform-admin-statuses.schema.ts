import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PlatformAdminsModel } from '../platform-admins.schema';

@Entity({
  name: 'platform_admin_statuses',
})
export class PlatformAdminStatusesModel {
  @PrimaryGeneratedColumn('increment', {
    name: 'platform_admin_status_id',
  })
  platformAdminStatusId!: number;

  @Column({
    name: 'platform_admin_status_name_fa',
    type: 'varchar',
    length: 100,
  })
  platformAdminStatusNameFa!: string;

  @Column({
    name: 'platform_admin_status_name_en',
    type: 'varchar',
    length: 100,
  })
  platformAdminStatusNameEn!: string;

  @Column({
    name: 'platform_admin_status_slug',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  platformAdminStatusSlug!: string;

  @Column({
    name: 'platform_admin_status_description_en',
    type: 'text',
    nullable: true,
  })
  platformAdminStatusDescriptionEn!: string | null;

  @Column({
    name: 'platform_admin_status_description_fa',
    type: 'text',
    nullable: true,
  })
  platformAdminStatusDescriptionFa!: string | null;

  @Column({
    name: 'platform_admin_status_sort_order',
    type: 'integer',
    default: 0,
  })
  platformAdminStatusSortOrder!: number;

  @Column({
    name: 'platform_admin_status_is_system',
    type: 'boolean',
    default: true,
  })
  platformAdminStatusIsSystem!: boolean;

  @OneToMany(() => PlatformAdminsModel, (platformAdmin) => platformAdmin.platformAdminStatus, {
    eager: false,
  })
  platformAdmins!: PlatformAdminsModel[];

  @CreateDateColumn({
    name: 'platform_admin_status_created_at',
    type: 'timestamp',
  })
  platformAdminStatusCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'platform_admin_status_updated_at',
    type: 'timestamp',
  })
  platformAdminStatusUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'platform_admin_status_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  platformAdminStatusDeletedAt!: Date | null;
}
