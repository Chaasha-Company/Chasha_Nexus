import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PlatformAdminsModel } from '../platform-admins.schema';

@Entity({
  name: 'platform_admin_statuses',
})
export class PlatformAdminStatusesModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'platform_admin_status_id',
  })
  platformAdminStatusId!: string;

  @Column({
    name: 'platform_admin_status_name',
    type: 'varchar',
    length: 100,
  })
  platformAdminStatusName!: string;

  @Column({
    name: 'platform_admin_status_slug',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  platformAdminStatusSlug!: string;

  @Column({
    name: 'platform_admin_status_description',
    type: 'text',
    nullable: true,
  })
  platformAdminStatusDescription!: string | null;

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
