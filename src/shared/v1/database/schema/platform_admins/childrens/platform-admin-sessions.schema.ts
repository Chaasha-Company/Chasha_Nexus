import { PlatformAdminsModel } from '../platform-admins.schema';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'platform_admin_sessions',
})
export class PlatformAdminSessionsModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'platform_admin_session_id',
  })
  platformAdminSessionId!: string;

  @Column({
    name: 'platform_admin_session_user_id',
    type: 'uuid',
  })
  platformAdminSessionUserId!: string;

  @ManyToOne(() => PlatformAdminsModel, (admin) => admin.platformAdminSessions, { eager: false })
  @JoinColumn({
    name: 'platform_admin_session_user_id',
  })
  platformAdminSessionUser!: PlatformAdminsModel;

  @Column({
    name: 'platform_admin_session_refresh_token',
    type: 'varchar',
    length: 500,
  })
  platformAdminSessionRefreshToken!: string;

  @Column({
    name: 'platform_admin_session_ip_address',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  platformAdminSessionIpAddress!: string | null;

  @Column({
    name: 'platform_admin_session_user_agent',
    type: 'text',
    nullable: true,
  })
  platformAdminSessionUserAgent!: string | null;

  @Column({
    name: 'platform_admin_session_last_activity_at',
    type: 'timestamp',
    nullable: true,
  })
  platformAdminSessionLastActivityAt!: Date | null;

  @Column({
    name: 'platform_admin_session_expires_at',
    type: 'timestamp',
  })
  platformAdminSessionExpiresAt!: Date;

  @Column({
    name: 'platform_admin_session_is_active',
    type: 'boolean',
    default: true,
  })
  platformAdminSessionIsActive!: boolean;

  @Column({
    name: 'platform_admin_session_revoked_at',
    type: 'timestamp',
    nullable: true,
  })
  platformAdminSessionRevokedAt!: Date | null;

  @CreateDateColumn({
    name: 'platform_admin_session_created_at',
    type: 'timestamp',
  })
  platformAdminSessionCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'platform_admin_session_updated_at',
    type: 'timestamp',
  })
  platformAdminSessionUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'platform_admin_session_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  platformAdminSessionDeletedAt!: Date | null;
}
