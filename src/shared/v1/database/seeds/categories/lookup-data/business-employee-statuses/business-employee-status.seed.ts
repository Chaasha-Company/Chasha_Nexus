import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { BusinessEmployeeStatusesModel } from '@/shared/v1/database/schema/business_employees/childrens';

export const createBusinessEmployeeStatusDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(BusinessEmployeeStatusesModel);

  const businessEmployeeStatusesData = [
    {
      businessEmployeeStatusName: 'فعال',
      businessEmployeeStatusSlug: 'active',
      businessEmployeeStatusDescription: 'کارمند فعال است',
      businessEmployeeStatusSortOrder: 1,
      businessEmployeeStatusIsSystem: true,
    },
    {
      businessEmployeeStatusName: 'غیرفعال',
      businessEmployeeStatusSlug: 'inactive',
      businessEmployeeStatusDescription: 'کارمند غیرفعال است',
      businessEmployeeStatusSortOrder: 2,
      businessEmployeeStatusIsSystem: true,
    },
    {
      businessEmployeeStatusName: 'تعلیق شده',
      businessEmployeeStatusSlug: 'suspended',
      businessEmployeeStatusDescription: 'دسترسی و فعالیت کارمند به صورت موقت متوقف شده است',
      businessEmployeeStatusSortOrder: 3,
      businessEmployeeStatusIsSystem: true,
    },
  ];

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Business Employee Statuses Table has Data - Seed Runned !');

    return;
  }

  await repository.insert(businessEmployeeStatusesData);

  loggerConfig.info('Business Employee Statuses Table has no Data - Seed Runned and Data insert !');
};
