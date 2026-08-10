import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { FaqTypesModel } from './childrens';

@Entity({
  name: 'faqs',
})
export class FaqsModel {
  @PrimaryGeneratedColumn('increment', {
    name: 'faq_id',
  })
  faqId!: number;

  @Column({
    name: 'faq_type_id',
    type: 'integer',
  })
  faqTypeId!: number;

  @Column({
    name: 'faq_question_fa',
    type: 'varchar',
    length: 500,
  })
  faqQuestionFa!: string;

  @Column({
    name: 'faq_question_en',
    type: 'varchar',
    length: 500,
  })
  faqQuestionEn!: string;

  @Column({
    name: 'faq_answer_fa',
    type: 'text',
  })
  faqAnswerFa!: string;

  @Column({
    name: 'faq_answer_en',
    type: 'text',
  })
  faqAnswerEn!: string;

  @Column({
    name: 'faq_slug',
    type: 'varchar',
    length: 150,
    unique: true,
  })
  faqSlug!: string;

  @Column({
    name: 'faq_sort_order',
    type: 'integer',
    default: 0,
  })
  faqSortOrder!: number;

  @Column({
    name: 'faq_is_active',
    type: 'boolean',
    default: true,
  })
  faqIsActive!: boolean;

  @ManyToOne(() => FaqTypesModel, (faqType) => faqType.faqs, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'faq_type_id',
    referencedColumnName: 'faqTypeId',
  })
  faqType!: FaqTypesModel;

  @CreateDateColumn({
    name: 'faq_created_at',
    type: 'timestamp',
  })
  faqCreatedAt!: Date;

  @UpdateDateColumn({
    name: 'faq_updated_at',
    type: 'timestamp',
  })
  faqUpdatedAt!: Date;

  @DeleteDateColumn({
    name: 'faq_deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  faqDeletedAt!: Date | null;
}
