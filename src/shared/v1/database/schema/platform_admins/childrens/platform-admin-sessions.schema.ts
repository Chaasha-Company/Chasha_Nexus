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
