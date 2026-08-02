import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessEmployeeStatusesModel } from '@/shared/v1/database/schema/business_employees/childrens';

export const createBusinessEmployeeStatusDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(BusinessEmployeeStatusesModel);

  const businessEmployeeStatusesData = [
    {
      businessEmployeeStatusNameEn: 'Active',
      businessEmployeeStatusNameFa: 'فعال',
      businessEmployeeStatusSlug: 'active',
      businessEmployeeStatusDescriptionEn: 'Employee account is active and can access the business platform.',
      businessEmployeeStatusDescriptionFa: 'کارمند فعال است و امکان استفاده از پنل کسب‌وکار را دارد.',
      businessEmployeeStatusSortOrder: 1,
      businessEmployeeStatusIsSystem: true,
    },
    {
      businessEmployeeStatusNameEn: 'Inactive',
      businessEmployeeStatusNameFa: 'غیرفعال',
      businessEmployeeStatusSlug: 'inactive',
      businessEmployeeStatusDescriptionEn: 'Employee account is inactive and cannot access the business platform.',
      businessEmployeeStatusDescriptionFa: 'کارمند غیرفعال است و دسترسی به پنل کسب‌وکار ندارد.',
      businessEmployeeStatusSortOrder: 2,
      businessEmployeeStatusIsSystem: true,
    },
    {
      businessEmployeeStatusNameEn: 'Suspended',
      businessEmployeeStatusNameFa: 'تعلیق شده',
      businessEmployeeStatusSlug: 'suspended',
      businessEmployeeStatusDescriptionEn: 'Employee access has been temporarily suspended.',
      businessEmployeeStatusDescriptionFa: 'دسترسی و فعالیت کارمند به صورت موقت متوقف شده است.',
      businessEmployeeStatusSortOrder: 3,
      businessEmployeeStatusIsSystem: true,
    },
    {
      businessEmployeeStatusNameEn: 'Pending',
      businessEmployeeStatusNameFa: 'در انتظار تایید',
      businessEmployeeStatusSlug: 'pending',
      businessEmployeeStatusDescriptionEn: 'Employee account is waiting for approval.',
      businessEmployeeStatusDescriptionFa: 'حساب کارمند منتظر تایید مدیر کسب‌وکار است.',
      businessEmployeeStatusSortOrder: 4,
      businessEmployeeStatusIsSystem: true,
    },
  ];

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Business Employee Statuses Table has Data - Seed Skipped!');

    return;
  }

  await repository.insert(businessEmployeeStatusesData);

  loggerConfig.info('Business Employee Statuses Table Seed Completed Successfully!');
};
