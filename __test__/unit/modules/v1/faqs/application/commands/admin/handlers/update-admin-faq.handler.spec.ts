import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { updateAdminFaqCommandHandler } from '@/modules/v1/faqs/application/commands/admin/handlers/update-admin-faq.handler';

import { findAdminFaqByIdRepository, findAdminFaqBySlugRepository, findAdminFaqTypeByIdRepository, updateAdminFaqRepository } from '@/modules/v1/faqs/infrastructure';

const mockInvalidateCache = jest.fn<() => Promise<void>>();
jest.mock('@/shared/v1/domain/contracts', () => ({
  invalidateCache: (...args: unknown[]) => mockInvalidateCache(...(args as [])),
}));

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAdminFaqByIdRepository: jest.fn(),
  findAdminFaqBySlugRepository: jest.fn(),
  findAdminFaqTypeByIdRepository: jest.fn(),
  updateAdminFaqRepository: jest.fn(),
}));

const mockFindById = jest.fn<(data: { faqId: number }) => Promise<FaqsModel | null>>();
(findAdminFaqByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindById) => void }).mockReturnValue(mockFindById);

const mockFindBySlug = jest.fn<(data: { faqSlug: string }) => Promise<FaqsModel | null>>();
(findAdminFaqBySlugRepository as unknown as { mockReturnValue: (value: typeof mockFindBySlug) => void }).mockReturnValue(mockFindBySlug);

const mockFindTypeById = jest.fn<(data: { faqTypeId: number }) => Promise<FaqTypesModel | null>>();
(findAdminFaqTypeByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindTypeById) => void }).mockReturnValue(mockFindTypeById);

const mockUpdate = jest.fn<(data: unknown) => Promise<void>>();
(updateAdminFaqRepository as unknown as { mockReturnValue: (value: typeof mockUpdate) => void }).mockReturnValue(mockUpdate);

const existingFaq = {
  faqId: 1,
  faqTypeId: 1,
  faqQuestionFa: 'سوال',
  faqQuestionEn: 'Question',
  faqAnswerFa: 'پاسخ',
  faqAnswerEn: 'Answer',
  faqSlug: 'faq-one',
  faqSortOrder: 1,
} as FaqsModel;

describe('updateAdminFaqCommandHandler', () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockFindBySlug.mockReset();
    mockFindTypeById.mockReset();
    mockUpdate.mockReset();
    mockInvalidateCache.mockReset();
    mockInvalidateCache.mockResolvedValue(undefined);
    mockFindById.mockResolvedValue(existingFaq);
  });

  it('does not execute an UPDATE query when submitted values equal persisted values', async () => {
    await updateAdminFaqCommandHandler(
      {
        faqId: 1,
        faqQuestionFa: 'سوال',
        faqSortOrder: 1,
      },
      'en',
    );

    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockInvalidateCache).not.toHaveBeenCalled();
  });

  it('executes an UPDATE query with only changed values when at least one value differs', async () => {
    await updateAdminFaqCommandHandler(
      {
        faqId: 1,
        faqQuestionFa: 'سوال',
        faqSortOrder: 2,
      },
      'en',
    );

    expect(mockUpdate).toHaveBeenCalledWith({ faqId: 1, faqSortOrder: 2 });
    expect(mockInvalidateCache).toHaveBeenCalledWith(['faqs']);
  });

  it('throws when the FAQ does not exist', async () => {
    mockFindById.mockResolvedValue(null);

    await expect(updateAdminFaqCommandHandler({ faqId: 99, faqSortOrder: 2 }, 'en')).rejects.toThrow();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('validates the new FAQ type when faqTypeId changes', async () => {
    mockFindTypeById.mockResolvedValue(null);

    await expect(updateAdminFaqCommandHandler({ faqId: 1, faqTypeId: 99 }, 'en')).rejects.toThrow();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('rejects a duplicate slug when faqSlug changes', async () => {
    mockFindBySlug.mockResolvedValue({ faqId: 2 } as FaqsModel);

    await expect(updateAdminFaqCommandHandler({ faqId: 1, faqSlug: 'taken' }, 'en')).rejects.toThrow();
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
