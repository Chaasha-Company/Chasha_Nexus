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
      faqAnswerFa: 'چاشا یک سیستم عامل مدیریت کسب‌وکارهای غذایی است که به رستوران‌ها، کافه‌ها و مجموعه‌های پذیرایی کمک می‌کند فرآیند سفارش، ارتباط با مشتری و عملیات روزانه خود را ساده‌تر، سریع‌تر و حرفه‌ای‌تر مدیریت کنند.',
      faqAnswerEn: 'Chasha is a restaurant operating system that helps restaurants, cafes, and food businesses simplify, accelerate, and professionally manage their ordering, customer experience, and daily operations.',
      faqSlug: 'what-is-chasha',
      faqSortOrder: 1,
      faqIsActive: true,
    },
    {
      faqTypeId: landingType?.faqTypeId,
      faqQuestionFa: 'چاشا برای چه کسب‌وکارهایی مناسب است؟',
      faqQuestionEn: 'What businesses is Chasha suitable for?',
      faqAnswerFa: 'چاشا برای انواع کسب‌وکارهای غذایی مانند رستوران‌ها، کافه‌ها، فودکورت‌ها، مجموعه‌های پذیرایی و کسب‌وکارهایی که نیاز به مدیریت بهتر سفارش‌ها و تجربه مشتری دارند طراحی شده است.',
      faqAnswerEn: 'Chasha is designed for various food businesses including restaurants, cafes, food courts, hospitality venues, and businesses that need better order management and customer experience.',
      faqSlug: 'businesses-suitable-for-chasha',
      faqSortOrder: 2,
      faqIsActive: true,
    },
    {
      faqTypeId: landingType?.faqTypeId,
      faqQuestionFa: 'چرا کسب‌وکارهای غذایی به چاشا نیاز دارند؟',
      faqQuestionEn: 'Why do food businesses need Chasha?',
      faqAnswerFa: 'چاشا با کاهش فرآیندهای دستی، افزایش سرعت ثبت سفارش‌ها و ایجاد ارتباط بهتر بین مشتری و تیم کسب‌وکار، به مجموعه‌های غذایی کمک می‌کند عملکرد روزانه خود را بهینه کنند.',
      faqAnswerEn: 'Chasha helps food businesses optimize daily operations by reducing manual processes, speeding up order management, and improving communication between customers and staff.',
      faqSlug: 'why-businesses-need-chasha',
      faqSortOrder: 3,
      faqIsActive: true,
    },
    {
      faqTypeId: landingType?.faqTypeId,
      faqQuestionFa: 'آیا برای استفاده از چاشا به تجهیزات خاصی نیاز داریم؟',
      faqQuestionEn: 'Do we need special equipment to use Chasha?',
      faqAnswerFa: 'خیر. چاشا یک پلتفرم تحت وب است و بدون نیاز به تجهیزات اختصاصی قابل استفاده است. تنها چیزی که نیاز دارید دسترسی به اینترنت و دستگاه‌های معمول مانند موبایل یا تبلت است.',
      faqAnswerEn: 'No. Chasha is a web-based platform that works without dedicated hardware. You only need internet access and common devices such as smartphones or tablets.',
      faqSlug: 'special-equipment-required',
      faqSortOrder: 4,
      faqIsActive: true,
    },
    {
      faqTypeId: businessType?.faqTypeId,
      faqQuestionFa: 'چگونه می‌توانم کسب‌وکار خود را در چاشا فعال کنم؟',
      faqQuestionEn: 'How can I activate my business on Chasha?',
      faqAnswerFa: 'برای شروع کافی است درخواست خود را ثبت کنید. تیم چاشا اطلاعات لازم را بررسی کرده و مراحل راه‌اندازی سیستم را با شما هماهنگ می‌کند.',
      faqAnswerEn: 'To get started, submit your request. The Chasha team will review your information and guide you through the setup process.',
      faqSlug: 'activate-business-on-chasha',
      faqSortOrder: 1,
      faqIsActive: true,
    },
    {
      faqTypeId: businessType?.faqTypeId,
      faqQuestionFa: 'آیا مشتریان می‌توانند بدون انتظار برای نیروی خدماتی سفارش ثبت کنند؟',
      faqQuestionEn: 'Can customers place orders without waiting for staff?',
      faqAnswerFa: 'بله. مشتریان می‌توانند از طریق QR Code منوی دیجیتال را مشاهده کرده و درخواست سفارش خود را ثبت کنند تا فرآیند سرویس‌دهی سریع‌تر انجام شود.',
      faqAnswerEn: 'Yes. Customers can access the digital menu through QR Code and submit their orders, making service faster and more efficient.',
      faqSlug: 'qr-code-digital-ordering',
      faqSortOrder: 2,
      faqIsActive: true,
    },
    {
      faqTypeId: businessType?.faqTypeId,
      faqQuestionFa: 'آیا چاشا سفارش‌ها را به‌صورت لحظه‌ای مدیریت می‌کند؟',
      faqQuestionEn: 'Does Chasha manage orders in real time?',
      faqAnswerFa: 'بله. سفارش‌ها به‌صورت لحظه‌ای بین بخش‌های مختلف کسب‌وکار منتقل می‌شوند تا تیم بتواند سریع‌تر و دقیق‌تر عملیات را مدیریت کند.',
      faqAnswerEn: 'Yes. Orders are transferred in real time between different operational areas so teams can manage processes faster and more accurately.',
      faqSlug: 'real-time-order-management',
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
