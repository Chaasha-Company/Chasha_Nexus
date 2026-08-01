import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';

export const createBusinessTypeDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(BusinessTypesModel);

  const businessTypesData: Partial<BusinessTypesModel>[] = [
    {
      businessTypeNameEn: 'Restaurant',
      businessTypeNameFa: 'رستوران',
      businessTypeSlug: 'restaurant',
      businessTypeSortOrder: 1,
      businessTypeIsActive: true,
    },
    {
      businessTypeNameEn: 'Cafe',
      businessTypeNameFa: 'کافه',
      businessTypeSlug: 'cafe',
      businessTypeSortOrder: 2,
      businessTypeIsActive: true,
    },
    {
      businessTypeNameEn: 'Fast Food',
      businessTypeNameFa: 'فست فود',
      businessTypeSlug: 'fast-food',
      businessTypeSortOrder: 3,
      businessTypeIsActive: true,
    },
    {
      businessTypeNameEn: 'Coffee Shop',
      businessTypeNameFa: 'کافی شاپ',
      businessTypeSlug: 'coffee-shop',
      businessTypeSortOrder: 4,
      businessTypeIsActive: true,
    },
    {
      businessTypeNameEn: 'Bakery',
      businessTypeNameFa: 'نانوایی و شیرینی فروشی',
      businessTypeSlug: 'bakery',
      businessTypeSortOrder: 5,
      businessTypeIsActive: true,
    },
    {
      businessTypeNameEn: 'Dessert Shop',
      businessTypeNameFa: 'فروشگاه دسر',
      businessTypeSlug: 'dessert-shop',
      businessTypeSortOrder: 6,
      businessTypeIsActive: true,
    },
    {
      businessTypeNameEn: 'Other',
      businessTypeNameFa: 'سایر',
      businessTypeSlug: 'other',
      businessTypeSortOrder: 99,
      businessTypeIsActive: true,
    },
  ];

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Business Types Table has Data - Seed Skipped!');

    return;
  }

  await repository.insert(businessTypesData);

  loggerConfig.info('Business Types Table Seed Completed Successfully!');
};
