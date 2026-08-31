import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/childrens';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { findAllFaqByTypeQueryHandler } from '@/modules/v1/faqs/application/queries/handlers/find-all-faq-by-type.handler';

import { findAllFaqByTypeRepository, findFaqTypeBySlugRepository } from '@/modules/v1/faqs/infrastructure';

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findFaqTypeBySlugRepository: jest.fn(),
  findAllFaqByTypeRepository: jest.fn(),
}));

const mockFindType = jest.fn<(data: { faqTypeSlug: 'landing' | 'business' }) => Promise<FaqTypesModel | null>>();
(findFaqTypeBySlugRepository as unknown as { mockReturnValue: (value: typeof mockFindType) => void }).mockReturnValue(mockFindType);

const mockFindAll = jest.fn<(data: { faqTypeId: number }) => Promise<FaqsModel[]>>();
(findAllFaqByTypeRepository as unknown as { mockReturnValue: (value: typeof mockFindAll) => void }).mockReturnValue(mockFindAll);

const faqTypeRow = { faqTypeId: 1, faqTypeSlug: 'landing' } as FaqTypesModel;

const faqRows: FaqsModel[] = [
  {
    faqQuestionFa: 'پرسش یک',
    faqQuestionEn: 'Question one',
    faqAnswerFa: 'پاسخ یک',
    faqAnswerEn: 'Answer one',
    faqSlug: 'faq-one',
    faqSortOrder: 1,
    faqIsActive: true,
  },
  {
    faqQuestionFa: 'پرسش دو',
    faqQuestionEn: 'Question two',
    faqAnswerFa: 'پاسخ دو',
    faqAnswerEn: 'Answer two',
    faqSlug: 'faq-two',
    faqSortOrder: 2,
    faqIsActive: true,
  },
] as FaqsModel[];

describe('findAllFaqByTypeQueryHandler', () => {
  beforeEach(() => {
    mockFindType.mockReset();
    mockFindAll.mockReset();
  });

  it('maps only the public FAQ fields and preserves ordering', async () => {
    mockFindType.mockResolvedValue(faqTypeRow);
    mockFindAll.mockResolvedValue(faqRows);

    const result = await findAllFaqByTypeQueryHandler({ faqType: 'landing' }, 'en');

    expect(mockFindType).toHaveBeenCalledWith({ faqTypeSlug: 'landing' });
    expect(mockFindAll).toHaveBeenCalledWith({ faqTypeId: 1 });
    expect(result).toEqual([
      {
        faqQuestionFa: 'پرسش یک',
        faqQuestionEn: 'Question one',
        faqAnswerFa: 'پاسخ یک',
        faqAnswerEn: 'Answer one',
        faqSlug: 'faq-one',
        faqSortOrder: 1,
        faqIsActive: true,
      },
      {
        faqQuestionFa: 'پرسش دو',
        faqQuestionEn: 'Question two',
        faqAnswerFa: 'پاسخ دو',
        faqAnswerEn: 'Answer two',
        faqSlug: 'faq-two',
        faqSortOrder: 2,
        faqIsActive: true,
      },
    ]);
  });

  it('returns an empty list when the type exists but has no FAQs', async () => {
    mockFindType.mockResolvedValue(faqTypeRow);
    mockFindAll.mockResolvedValue([]);

    await expect(findAllFaqByTypeQueryHandler({ faqType: 'business' }, 'en')).resolves.toEqual([]);
  });

  it('looks up the faq type by the requested slug before querying FAQs', async () => {
    mockFindType.mockResolvedValue({ faqTypeId: 7, faqTypeSlug: 'business' } as FaqTypesModel);
    mockFindAll.mockResolvedValue([]);

    await findAllFaqByTypeQueryHandler({ faqType: 'business' }, 'en');

    expect(mockFindType).toHaveBeenCalledWith({ faqTypeSlug: 'business' });
    expect(mockFindAll).toHaveBeenCalledWith({ faqTypeId: 7 });
  });

  it('throws a not-found exception and skips the FAQ query when the type does not exist', async () => {
    mockFindType.mockResolvedValue(null);

    await expect(findAllFaqByTypeQueryHandler({ faqType: 'landing' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockFindAll).not.toHaveBeenCalled();
  });
});
