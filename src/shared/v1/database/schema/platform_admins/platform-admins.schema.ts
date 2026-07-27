import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PlatformAdminStatusesModel } from './childrens/platform-admin-statuses.schema';

@Entity({
  name: 'platform_admins',
})
export class PlatformAdminsModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'platform_admin_id',
  })
  platformAdminId!: string;

  /**
   * Relation:
   * platform_admin_statuses.platform_admin_status_id
   *        |
   *        |
   *        ↓
   * platform_admins.platform_admin_status_id
   */
  @Column({
    name: 'platform_admin_status_id',
    type: 'uuid',
  })
  platformAdminStatusId!: string;

  @ManyToOne(() => PlatformAdminStatusesModel, (platformAdminStatus) => platformAdminStatus.platformAdmins, {
    eager: false,
  })
  @JoinColumn({
    name: 'platform_admin_status_id',
  })
  platformAdminStatus!: PlatformAdminStatusesModel;

  @Column({
    name: 'platform_admin_first_name',
    type: 'varchar',
    length: 100,
  })
  platformAdminFirstName!: string;

  @Column({
    name: 'platform_admin_last_name',
    type: 'varchar',
    length: 100,
  })
  platformAdminLastName!: string;

  @Column({
    name: 'platform_admin_phone_number',
    type: 'varchar',
    length: 11,
    unique: true,
  })
  platformAdminPhoneNumber!: string;

  @Column({
    name: 'platform_admin_password',
    length: 64,
    type: 'varchar',
  })
  platformAdminPassword!: string;

  @Column({
    name: 'platform_admin_is_phone_verified',
    type: 'boolean',
    default: false,
  })
  platformAdminIsPhoneVerified!: boolean;

  @Column({
    name: 'platform_admin_last_login_at',
    type: 'timestamp',
    nullable: true,
  })
  platformAdminLastLoginAt!: Date | null;

  @CreateDateColumn({
    name: 'platform_admin_created_at',
    type: 'timestamp',
  })
  platformAdminCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'platform_admin_updated_at',
    type: 'timestamp',
  })
  platformAdminUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'platform_admin_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  platformAdminDeletedAt!: Date | null;
}
