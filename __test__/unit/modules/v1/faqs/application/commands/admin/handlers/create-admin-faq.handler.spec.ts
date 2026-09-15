import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { createAdminFaqCommandHandler } from '@/modules/v1/faqs/application/commands/admin/handlers/create-admin-faq.handler';

import { createAdminFaqRepository, findAdminFaqBySlugRepository, findAdminFaqTypeByIdRepository } from '@/modules/v1/faqs/infrastructure';

const mockInvalidateCache = jest.fn<() => Promise<void>>();
jest.mock('@/shared/v1/domain/contracts', () => ({
  invalidateCache: (...args: unknown[]) => mockInvalidateCache(...(args as [])),
}));

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAdminFaqTypeByIdRepository: jest.fn(),
  findAdminFaqBySlugRepository: jest.fn(),
  createAdminFaqRepository: jest.fn(),
}));

const mockFindTypeById = jest.fn<(data: { faqTypeId: number }) => Promise<FaqTypesModel | null>>();
(findAdminFaqTypeByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindTypeById) => void }).mockReturnValue(mockFindTypeById);

const mockFindBySlug = jest.fn<(data: { faqSlug: string }) => Promise<FaqsModel | null>>();
(findAdminFaqBySlugRepository as unknown as { mockReturnValue: (value: typeof mockFindBySlug) => void }).mockReturnValue(mockFindBySlug);

const mockCreate = jest.fn<(data: unknown) => Promise<FaqsModel>>();
(createAdminFaqRepository as unknown as { mockReturnValue: (value: typeof mockCreate) => void }).mockReturnValue(mockCreate);

const createdRow = {
  faqId: 1,
  faqTypeId: 1,
  faqQuestionFa: 'سوال',
  faqQuestionEn: '',
  faqAnswerFa: 'پاسخ',
  faqAnswerEn: '',
  faqSlug: 'faq-one',
  faqSortOrder: 1,
  faqIsActive: true,
  faqDeletedAt: null,
  faqType: {
    faqTypeId: 1,
    faqTypeNameFa: 'نوع',
    faqTypeNameEn: 'Type',
    faqTypeSlug: 'landing',
    faqTypeSortOrder: 1,
    faqTypeIsActive: true,
  },
  faqCreatedAt: new Date('2026-09-15T00:00:00.000Z'),
  faqUpdatedAt: new Date('2026-09-15T00:00:00.000Z'),
} as unknown as FaqsModel;

describe('createAdminFaqCommandHandler', () => {
  beforeEach(() => {
    mockFindTypeById.mockReset();
    mockFindBySlug.mockReset();
    mockCreate.mockReset();
    mockInvalidateCache.mockReset();
    mockInvalidateCache.mockResolvedValue(undefined);
    mockFindTypeById.mockResolvedValue({ faqTypeId: 1 } as FaqTypesModel);
    mockFindBySlug.mockResolvedValue(null);
    mockCreate.mockResolvedValue(createdRow);
  });

  it('creates the FAQ, strips deletedAt, and invalidates the cache', async () => {
    const result = await createAdminFaqCommandHandler(
      {
        faqTypeId: 1,
        faqQuestionFa: 'سوال',
        faqAnswerFa: 'پاسخ',
        faqSlug: 'faq-one',
        faqSortOrder: 1,
      },
      'en',
    );

    expect(mockCreate).toHaveBeenCalled();
    expect(mockInvalidateCache).toHaveBeenCalledWith(['faqs']);
    expect(result).not.toHaveProperty('faqDeletedAt');
    expect(result.faqSlug).toBe('faq-one');
    expect(result.faqType).not.toHaveProperty('faqTypeDeletedAt');
  });

  it('throws when the FAQ type does not exist', async () => {
    mockFindTypeById.mockResolvedValue(null);

    await expect(createAdminFaqCommandHandler({ faqTypeId: 99, faqQuestionFa: 'سوال', faqAnswerFa: 'پاسخ', faqSlug: 'faq-one', faqSortOrder: 1 }, 'en')).rejects.toThrow();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('throws on duplicate slug', async () => {
    mockFindBySlug.mockResolvedValue({ faqId: 2 } as FaqsModel);

    await expect(createAdminFaqCommandHandler({ faqTypeId: 1, faqQuestionFa: 'سوال', faqAnswerFa: 'پاسخ', faqSlug: 'taken', faqSortOrder: 1 }, 'en')).rejects.toThrow();
    expect(mockCreate).not.toHaveBeenCalled();
  });
});
