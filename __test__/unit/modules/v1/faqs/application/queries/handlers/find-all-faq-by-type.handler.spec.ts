import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { findAllFaqByTypeQueryHandler } from '@/modules/v1/faqs/application/queries/handlers/find-all-faq-by-type.handler';

import { findAllFaqByTypeRepository, findFaqTypeBySlugRepository } from '@/modules/v1/faqs/infrastructure';

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findFaqTypeBySlugRepository: jest.fn(),
  findAllFaqByTypeRepository: jest.fn(),
}));

const mockFindType = jest.fn<(data: { faqTypeSlug: 'landing' | 'business' }) => Promise<FaqTypesModel | null>>();
(findFaqTypeBySlugRepository as unknown as { mockReturnValue: (value: typeof mockFindType) => void }).mockReturnValue(mockFindType);

const mockFindAll = jest.fn<(data: { faqTypeId: number; faqSearchQuery?: string; faqPaginationSkip: number; faqPaginationTake: number }) => Promise<{ count: number; data: FaqsModel[] }>>();
(findAllFaqByTypeRepository as unknown as { mockReturnValue: (value: typeof mockFindAll) => void }).mockReturnValue(mockFindAll);

const faqTypeRow = { faqTypeId: 1, faqTypeSlug: 'landing' } as FaqTypesModel;

const faqRows: FaqsModel[] = [
  {
    faqQuestionFa: "U_O?O3O' UOUc",
    faqQuestionEn: 'Question one',
    faqAnswerFa: 'U_O?O3Or UOUc',
    faqAnswerEn: 'Answer one',
    faqSlug: 'faq-one',
    faqSortOrder: 1,
    faqIsActive: true,
  },
  {
    faqQuestionFa: "U_O?O3O' O_U^",
    faqQuestionEn: 'Question two',
    faqAnswerFa: 'U_O?O3Or O_U^',
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

  it('maps only the public FAQ fields and returns pagination metadata', async () => {
    mockFindType.mockResolvedValue(faqTypeRow);
    mockFindAll.mockResolvedValue({ count: 2, data: faqRows });

    const result = await findAllFaqByTypeQueryHandler({ faqType: 'landing', paginationPage: '1', paginationLimit: '10' }, 'en');

    expect(mockFindType).toHaveBeenCalledWith({ faqTypeSlug: 'landing' });
    expect(mockFindAll).toHaveBeenCalledWith({
      faqTypeId: 1,
      faqSearchQuery: undefined,
      faqPaginationSkip: 0,
      faqPaginationTake: 10,
    });
    expect(result).toEqual({
      count: 2,
      data: [
        {
          faqQuestionFa: "U_O?O3O' UOUc",
          faqQuestionEn: 'Question one',
          faqAnswerFa: 'U_O?O3Or UOUc',
          faqAnswerEn: 'Answer one',
          faqSlug: 'faq-one',
          faqSortOrder: 1,
          faqIsActive: true,
        },
        {
          faqQuestionFa: "U_O?O3O' O_U^",
          faqQuestionEn: 'Question two',
          faqAnswerFa: 'U_O?O3Or O_U^',
          faqAnswerEn: 'Answer two',
          faqSlug: 'faq-two',
          faqSortOrder: 2,
          faqIsActive: true,
        },
      ],
    });
  });

  it('passes search query and pagination offsets to the repository', async () => {
    mockFindType.mockResolvedValue({ faqTypeId: 7, faqTypeSlug: 'business' } as FaqTypesModel);
    mockFindAll.mockResolvedValue({ count: 0, data: [] });

    await findAllFaqByTypeQueryHandler({ faqType: 'business', faqSearch: 'refund', paginationPage: '2', paginationLimit: '5' }, 'en');

    expect(mockFindType).toHaveBeenCalledWith({ faqTypeSlug: 'business' });
    expect(mockFindAll).toHaveBeenCalledWith({
      faqTypeId: 7,
      faqSearchQuery: 'refund',
      faqPaginationSkip: 5,
      faqPaginationTake: 5,
    });
  });

  it('returns an empty paginated result when the type exists but has no FAQs', async () => {
    mockFindType.mockResolvedValue(faqTypeRow);
    mockFindAll.mockResolvedValue({ count: 0, data: [] });

    await expect(findAllFaqByTypeQueryHandler({ faqType: 'business', paginationPage: '1', paginationLimit: '10' }, 'en')).resolves.toEqual({
      count: 0,
      data: [],
    });
  });

  it('throws a not-found exception and skips the FAQ query when the type does not exist', async () => {
    mockFindType.mockResolvedValue(null);

    await expect(findAllFaqByTypeQueryHandler({ faqType: 'landing', paginationPage: '1', paginationLimit: '10' }, 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockFindAll).not.toHaveBeenCalled();
  });
});
