import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';

export const createEarlyAccessStatusDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(EarlyAccessRequestStatusesModel);

  const earlyAccessRequestStatusesData = [
    {
      earlyAccessRequestStatusNameFa: 'در انتظار بررسی',
      earlyAccessRequestStatusNameEn: 'Pending',
      earlyAccessRequestStatusSlug: 'pending',
      earlyAccessRequestStatusDescriptionFa: 'درخواست اولیه ثبت شده و منتظر بررسی است',
      earlyAccessRequestStatusDescriptionEn: 'Request submitted and waiting for review',
      earlyAccessRequestStatusSortOrder: 1,
      earlyAccessRequestStatusIsSystem: true,
    },
    {
      earlyAccessRequestStatusNameFa: 'تماس گرفته شده',
      earlyAccessRequestStatusNameEn: 'Contacted',
      earlyAccessRequestStatusSlug: 'contacted',
      earlyAccessRequestStatusDescriptionFa: 'با مشتری تماس گرفته شده است',
      earlyAccessRequestStatusDescriptionEn: 'Customer has been contacted',
      earlyAccessRequestStatusSortOrder: 2,
      earlyAccessRequestStatusIsSystem: true,
    },
    {
      earlyAccessRequestStatusNameFa: 'تبدیل شده',
      earlyAccessRequestStatusNameEn: 'Converted',
      earlyAccessRequestStatusSlug: 'converted',
      earlyAccessRequestStatusDescriptionFa: 'درخواست به مشتری واقعی تبدیل شده است',
      earlyAccessRequestStatusDescriptionEn: 'Request converted to customer',
      earlyAccessRequestStatusSortOrder: 3,
      earlyAccessRequestStatusIsSystem: true,
    },
    {
      earlyAccessRequestStatusNameFa: 'رد شده',
      earlyAccessRequestStatusNameEn: 'Rejected',
      earlyAccessRequestStatusSlug: 'rejected',
      earlyAccessRequestStatusDescriptionFa: 'درخواست رد شده است',
      earlyAccessRequestStatusDescriptionEn: 'Request rejected',
      earlyAccessRequestStatusSortOrder: 4,
      earlyAccessRequestStatusIsSystem: true,
    },
  ];

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Early Access Request Statuses Table has Data - Seed Skipped!');

    return;
  }

  await repository.upsert(earlyAccessRequestStatusesData, {
    conflictPaths: ['earlyAccessRequestStatusSlug'],
    skipUpdateIfNoValuesChanged: true,
  });

  loggerConfig.info('Early Access Request Statuses Table Seed Completed Successfully!');
};
