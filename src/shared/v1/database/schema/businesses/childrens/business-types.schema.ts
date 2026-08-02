import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { BusinessesModel } from '@/shared/v1/database/schema/businesses';
import { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';

@Entity({
  name: 'business_types',
})
export class BusinessTypesModel {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_type_id',
  })
  businessTypeId!: string;

  @Column({
    name: 'business_type_name_fa',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  businessTypeNameFa!: string;

  @Column({
    name: 'business_type_name_en',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  businessTypeNameEn!: string;

  @Column({
    name: 'business_type_slug',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  businessTypeSlug!: string;

  @Column({
    name: 'business_type_sort_order',
    type: 'int',
    default: 0,
  })
  businessTypeSortOrder!: number;

  @Column({
    name: 'business_type_is_active',
    type: 'boolean',
    default: true,
  })
  businessTypeIsActive!: boolean;

  @OneToMany(() => BusinessesModel, (business) => business.businessType, {
    eager: false,
  })
  businessTypeBusinesses!: BusinessesModel[];

  @OneToMany(() => EarlyAccessRequestsModel, (request) => request.earlyAccessRequestBusinessType, {
    eager: false,
  })
  businessTypeEarlyAccess!: EarlyAccessRequestsModel[];

  @CreateDateColumn({
    name: 'business_type_created_at',
    type: 'timestamp',
  })
  businessTypeCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'business_type_updated_at',
    type: 'timestamp',
  })
  businessTypeUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'business_type_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  businessTypeDeletedAt!: Date | null;
}
