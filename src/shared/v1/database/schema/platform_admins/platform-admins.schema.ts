import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PlatformAdminSessionsModel, PlatformAdminStatusesModel } from './childrens';
import { generateChashaResetPasswordCodeHelper, hashPasswordProvider } from '@/modules/v1/authentications';
import { PlatformAdminRolesModel } from './childrens/platform-admin-roles/platform-admin-roles.schema';

@Entity({
  name: 'platform_admins',
})
export class PlatformAdminsModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'platform_admin_id',
  })
  platformAdminId!: string;

  @Column({
    name: 'platform_admin_status_id',
    type: 'integer',
  })
  platformAdminStatusId!: number;

  @ManyToOne(() => PlatformAdminStatusesModel, (platformAdminStatus) => platformAdminStatus.platformAdmins)
  @JoinColumn({
    name: 'platform_admin_status_id',
  })
  platformAdminStatus!: PlatformAdminStatusesModel;

  @OneToMany(() => PlatformAdminSessionsModel, (session) => session.platformAdminSessionUser, { eager: false })
  platformAdminSessions!: PlatformAdminSessionsModel[];

  @Column({
    name: 'platform_admin_role_id',
    type: 'uuid',
  })
  platformAdminRoleId!: string;

  @ManyToOne(() => PlatformAdminRolesModel, (platformAdminRole) => platformAdminRole.platformAdminRoleAdmins, {
    eager: false,
  })
  @JoinColumn({
    name: 'platform_admin_role_id',
  })
  platformAdminRole!: PlatformAdminRolesModel;

  @Column({
    name: 'platform_admin_reset_password_code',
    type: 'varchar',
    length: 22,
  })
  platformAdminResetPasswordCode!: string;

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

  @BeforeInsert()
  async hashPasswordOnInsert(): Promise<void> {
    if (this.platformAdminPassword) {
      const hashPassword = hashPasswordProvider();
      this.platformAdminPassword = await hashPassword(this.platformAdminPassword);
      this.platformAdminResetPasswordCode = generateChashaResetPasswordCodeHelper();
    }
  }
}
