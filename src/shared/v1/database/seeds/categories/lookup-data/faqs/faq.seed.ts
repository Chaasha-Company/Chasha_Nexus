import { loggerConfig } from '@/config/logger';
import { AppDataSource } from '@/shared/v1/database/core';
import { FaqsModel, FaqTypesModel } from '@/shared/v1/database/schema/faqs';

export const createFaqDataSeed = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(FaqsModel);
  const faqTypeRepository = AppDataSource.getRepository(FaqTypesModel);

  const landingType = await faqTypeRepository.findOne({
    where: {
      faqTypeSlug: 'landing',
    },
  });

  const businessType = await faqTypeRepository.findOne({
    where: {
      faqTypeSlug: 'business',
    },
  });

  const faqsData = [
    {
      faqTypeId: landingType?.faqTypeId,
      faqQuestionFa: 'چاشا چیست؟',
      faqQuestionEn: 'What is Chasha?',
      faqAnswerFa: 'چاشا یک سیستم عامل مدیریت رستوران است که برای ساده‌تر، سریع‌تر و حرفه‌ای‌تر شدن فرآیندهای روزمره رستوران طراحی شده است.',
      faqAnswerEn: 'Chasha is a restaurant operating system designed to make daily restaurant operations simpler, faster, and more professional.',
      faqSlug: 'what-is-chasha',
      faqSortOrder: 1,
      faqIsActive: true,
    },
    {
      faqTypeId: landingType?.faqTypeId,
      faqQuestionFa: 'چاشا برای چه رستوران‌هایی مناسب است؟',
      faqQuestionEn: 'What type of restaurants is Chasha suitable for?',
      faqAnswerFa: 'چاشا برای رستوران‌ها و کافه‌هایی طراحی شده است که به دنبال مدیریت ساده‌تر سفارش‌ها و تجربه بهتر برای مشتریان خود هستند.',
      faqAnswerEn: 'Chasha is designed for restaurants and cafes looking for simpler order management and a better customer experience.',
      faqSlug: 'restaurants-suitable-for-chasha',
      faqSortOrder: 2,
      faqIsActive: true,
    },
    {
      faqTypeId: landingType?.faqTypeId,
      faqQuestionFa: 'آیا برای استفاده از چاشا نیاز به تجهیزات خاصی داریم؟',
      faqQuestionEn: 'Do we need special equipment to use Chasha?',
      faqAnswerFa: 'خیر. چاشا به‌صورت تحت وب ارائه می‌شود و برای استفاده از آن به تجهیزات سخت‌افزاری اختصاصی نیاز ندارید.',
      faqAnswerEn: 'No. Chasha is web-based and does not require dedicated hardware to get started.',
      faqSlug: 'special-equipment-required',
      faqSortOrder: 3,
      faqIsActive: true,
    },
    {
      faqTypeId: businessType?.faqTypeId,
      faqQuestionFa: 'چگونه می‌توانم رستوران خود را در چاشا ثبت کنم؟',
      faqQuestionEn: 'How can I register my restaurant on Chasha?',
      faqAnswerFa: 'برای شروع کافی است درخواست خود را از طریق صفحه اصلی چاشا ثبت کنید تا تیم پشتیبانی برای ادامه فرآیند با شما تماس بگیرد.',
      faqAnswerEn: 'To get started, submit your request through the Chasha landing page and our support team will contact you to continue the process.',
      faqSlug: 'register-restaurant',
      faqSortOrder: 1,
      faqIsActive: true,
    },
    {
      faqTypeId: businessType?.faqTypeId,
      faqQuestionFa: 'آیا مشتریان می‌توانند از طریق QR Code سفارش دهند؟',
      faqQuestionEn: 'Can customers order using a QR code?',
      faqAnswerFa: 'بله. هر میز می‌تواند QR Code اختصاصی داشته باشد و مشتری پس از اسکن آن می‌تواند منوی رستوران را مشاهده و سفارش خود را ثبت کند.',
      faqAnswerEn: 'Yes. Each table can have a dedicated QR code that allows customers to view the menu and place their orders.',
      faqSlug: 'qr-code-ordering',
      faqSortOrder: 2,
      faqIsActive: true,
    },
    {
      faqTypeId: businessType?.faqTypeId,
      faqQuestionFa: 'آیا چاشا از سفارش لحظه‌ای پشتیبانی می‌کند؟',
      faqQuestionEn: 'Does Chasha support real-time orders?',
      faqAnswerFa: 'بله. سفارش‌ها به‌صورت لحظه‌ای بین بخش‌های مختلف رستوران منتقل می‌شوند تا فرآیند دریافت و آماده‌سازی سفارش سریع‌تر انجام شود.',
      faqAnswerEn: 'Yes. Orders are transmitted in real time between restaurant staff and operational areas to make order processing faster.',
      faqSlug: 'real-time-orders',
      faqSortOrder: 3,
      faqIsActive: true,
    },
  ];

  const tableHasData = await repository.count();

  if (tableHasData > 0) {
    loggerConfig.info('Faqs Table has Data - Seed Skipped!');

    return;
  }

  await repository.upsert(faqsData, {
    conflictPaths: ['faqSlug'],
    skipUpdateIfNoValuesChanged: true,
  });

  loggerConfig.info('Faqs Table Seed Completed Successfully!');
};
