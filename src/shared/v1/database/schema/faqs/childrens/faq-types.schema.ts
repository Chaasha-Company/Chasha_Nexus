import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { FaqsModel } from '../faqs.schema';

@Entity({
  name: 'faq_types',
})
export class FaqTypesModel {
  @PrimaryGeneratedColumn('increment', {
    name: 'faq_type_id',
  })
  faqTypeId!: number;

  @Column({
    name: 'faq_type_name_fa',
    type: 'varchar',
    length: 100,
  })
  faqTypeNameFa!: string;

  @Column({
    name: 'faq_type_name_en',
    type: 'varchar',
    length: 100,
  })
  faqTypeNameEn!: string;

  @Column({
    name: 'faq_type_slug',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  faqTypeSlug!: string;

  @Column({
    name: 'faq_type_description_fa',
    type: 'text',
  })
  faqTypeDescriptionFa!: string;

  @Column({
    name: 'faq_type_description_en',
    type: 'text',
  })
  faqTypeDescriptionEn!: string;

  @Column({
    name: 'faq_type_sort_order',
    type: 'integer',
    default: 0,
  })
  faqTypeSortOrder!: number;

  @Column({
    name: 'faq_type_is_active',
    type: 'boolean',
    default: true,
  })
  faqTypeIsActive!: boolean;

  @OneToMany(() => FaqsModel, (faq) => faq.faqType, {
    eager: false,
  })
  faqTypeFaqs!: FaqsModel[];

  @CreateDateColumn({
    name: 'faq_type_created_at',
    type: 'timestamp',
  })
  faqTypeCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'faq_type_updated_at',
    type: 'timestamp',
  })
  faqTypeUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'faq_type_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  faqTypeDeletedAt!: Date | null;
}
