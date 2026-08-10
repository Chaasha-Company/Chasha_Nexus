import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { FaqTypesModel } from '@/shared/v1/database/schema/faqs';

export const createFaqTypeDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(FaqTypesModel);

  const faqTypesDate = [
    {
      faqTypeNameFa: 'صفحه اصلی',
      faqTypeNameEn: 'Landing Page',
      faqTypeSlug: 'landing',
      faqTypeDescriptionFa: 'سؤالات متداول مربوط به صفحه اصلی چاشا.',
      faqTypeDescriptionEn: 'Frequently asked questions related to the Chasha landing page.',
      faqTypeSortOrder: 1,
      faqTypeIsActive: true,
    },
    {
      faqTypeNameFa: 'کسب‌وکار',
      faqTypeNameEn: 'Business',
      faqTypeSlug: 'business',
      faqTypeDescriptionFa: 'سؤالات متداول مربوط به استفاده کسب‌وکارها از چاشا.',
      faqTypeDescriptionEn: 'Frequently asked questions related to businesses using Chasha.',
      faqTypeSortOrder: 2,
      faqTypeIsActive: true,
    },
  ];

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Faq Types Table has Data - Seed Skipped!');

    return;
  }

  await repository.upsert(faqTypesDate, {
    conflictPaths: ['faqTypeSlug'],
    skipUpdateIfNoValuesChanged: true,
  });

  loggerConfig.info('Faq Types Table Seed Completed Successfully!');
};
