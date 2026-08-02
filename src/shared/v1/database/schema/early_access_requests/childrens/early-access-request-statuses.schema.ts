import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { EarlyAccessRequestsModel } from '../early-access-requests.schema';

@Entity({
  name: 'early_access_request_statuses',
})
export class EarlyAccessRequestStatusesModel {
  @PrimaryGeneratedColumn('increment', {
    name: 'early_access_request_status_id',
  })
  earlyAccessRequestStatusId!: number;

  @Column({
    name: 'early_access_request_status_name_fa',
    type: 'varchar',
    length: 100,
  })
  earlyAccessRequestStatusNameFa!: string;

  @Column({
    name: 'early_access_request_status_name_en',
    type: 'varchar',
    length: 100,
  })
  earlyAccessRequestStatusNameEn!: string;

  @Column({
    name: 'early_access_request_status_slug',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  earlyAccessRequestStatusSlug!: string;

  @Column({
    name: 'early_access_request_status_description_fa',
    type: 'text',
    nullable: true,
  })
  earlyAccessRequestStatusDescriptionFa!: string | null;

  @Column({
    name: 'early_access_request_status_description_en',
    type: 'text',
    nullable: true,
  })
  earlyAccessRequestStatusDescriptionEn!: string | null;

  @Column({
    name: 'early_access_request_status_sort_order',
    type: 'integer',
    default: 0,
  })
  earlyAccessRequestStatusSortOrder!: number;

  @Column({
    name: 'early_access_request_status_is_system',
    type: 'boolean',
    default: true,
  })
  earlyAccessRequestStatusIsSystem!: boolean;

  @OneToMany(() => EarlyAccessRequestsModel, (request) => request.earlyAccessRequestStatus, {
    eager: false,
  })
  earlyAccessRequests!: EarlyAccessRequestsModel[];

  @CreateDateColumn({
    name: 'early_access_request_status_created_at',
    type: 'timestamp',
  })
  earlyAccessRequestStatusCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'early_access_request_status_updated_at',
    type: 'timestamp',
  })
  earlyAccessRequestStatusUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'early_access_request_status_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  earlyAccessRequestStatusDeletedAt!: Date | null;
}
