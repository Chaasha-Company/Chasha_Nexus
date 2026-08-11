import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';
import { EarlyAccessRequestStatusesModel } from './childrens';

@Entity({
  name: 'early_access_requests',
})
export class EarlyAccessRequestsModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'early_access_request_id',
  })
  earlyAccessRequestId!: string;

  @Column({
    name: 'early_access_request_status_id',
    type: 'integer',
  })
  earlyAccessRequestStatusId!: number;

  @ManyToOne(() => EarlyAccessRequestStatusesModel, (status) => status.earlyAccessRequests, {
    eager: false,
  })
  @JoinColumn({
    name: 'early_access_request_status_id',
  })
  earlyAccessRequestStatus!: EarlyAccessRequestStatusesModel;

  @Column({
    name: 'early_access_request_business_type_id',
    type: 'integer',
  })
  earlyAccessRequestBusinessTypeId!: number;

  @ManyToOne(() => BusinessTypesModel, (businessType) => businessType.businessTypeEarlyAccess, {
    eager: false,
  })
  @JoinColumn({
    name: 'early_access_request_business_type_id',
  })
  earlyAccessRequestBusinessType!: BusinessTypesModel;

  @Column({
    name: 'early_access_request_full_name',
    type: 'varchar',
    length: 150,
  })
  earlyAccessRequestFullName!: string;

  @Column({
    name: 'early_access_request_phone_number',
    type: 'varchar',
    length: 20,
  })
  earlyAccessRequestPhoneNumber!: string;

  @Column({
    name: 'early_access_request_business_name',
    type: 'varchar',
    length: 150,
  })
  earlyAccessRequestBusinessName!: string;

  @Column({
    name: 'early_access_request_code',
    type: 'varchar',
    length: 14,
  })
  earlyAccessRequestCode!: string;

  @Column({
    name: 'early_access_request_metadata',
    type: 'json',
    nullable: true,
  })
  earlyAccessRequestMetadata!: Record<string, unknown> | null;

  @CreateDateColumn({
    name: 'early_access_request_created_at',
    type: 'timestamp',
  })
  earlyAccessRequestCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'early_access_request_updated_at',
    type: 'timestamp',
  })
  earlyAccessRequestUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'early_access_request_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  earlyAccessRequestDeletedAt!: Date | null;
}
