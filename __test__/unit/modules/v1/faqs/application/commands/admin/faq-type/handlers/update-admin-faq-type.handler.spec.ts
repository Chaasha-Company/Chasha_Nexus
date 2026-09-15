import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { updateAdminFaqTypeCommandHandler } from '@/modules/v1/faqs/application/commands/admin/faq-type/handlers/update-admin-faq-type.handler';

import { findAdminFaqTypeByIdRepository, findAdminFaqTypeBySlugRepository, updateAdminFaqTypeRepository } from '@/modules/v1/faqs/infrastructure';

const mockInvalidateCache = jest.fn<() => Promise<void>>();
jest.mock('@/shared/v1/domain/contracts', () => ({
  invalidateCache: (...args: unknown[]) => mockInvalidateCache(...(args as [])),
}));

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAdminFaqTypeByIdRepository: jest.fn(),
  findAdminFaqTypeBySlugRepository: jest.fn(),
  updateAdminFaqTypeRepository: jest.fn(),
}));

const mockFindById = jest.fn<(data: { faqTypeId: number }) => Promise<FaqTypesModel | null>>();
(findAdminFaqTypeByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindById) => void }).mockReturnValue(mockFindById);

const mockFindBySlug = jest.fn<(data: { faqTypeSlug: string }) => Promise<FaqTypesModel | null>>();
(findAdminFaqTypeBySlugRepository as unknown as { mockReturnValue: (value: typeof mockFindBySlug) => void }).mockReturnValue(mockFindBySlug);

const mockUpdate = jest.fn<(data: unknown) => Promise<void>>();
(updateAdminFaqTypeRepository as unknown as { mockReturnValue: (value: typeof mockUpdate) => void }).mockReturnValue(mockUpdate);

const existingFaqType = {
  faqTypeId: 1,
  faqTypeNameFa: 'نوع',
  faqTypeNameEn: 'Type',
  faqTypeSlug: 'general',
  faqTypeDescriptionFa: 'توضیح',
  faqTypeDescriptionEn: 'Description',
} as FaqTypesModel;

describe('updateAdminFaqTypeCommandHandler', () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockFindBySlug.mockReset();
    mockUpdate.mockReset();
    mockInvalidateCache.mockReset();
    mockInvalidateCache.mockResolvedValue(undefined);
    mockFindById.mockResolvedValue(existingFaqType);
    mockFindBySlug.mockResolvedValue(null);
  });

  it('does not execute an UPDATE query when submitted values equal persisted values', async () => {
    await updateAdminFaqTypeCommandHandler(
      {
        faqTypeId: 1,
        faqTypeNameFa: 'نوع',
        faqTypeSlug: 'general',
      },
      'en',
    );

    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockInvalidateCache).not.toHaveBeenCalled();
  });

  it('executes an UPDATE query with only changed values when at least one value differs', async () => {
    await updateAdminFaqTypeCommandHandler(
      {
        faqTypeId: 1,
        faqTypeNameFa: 'نوع',
        faqTypeSlug: 'renamed',
      },
      'en',
    );

    expect(mockFindBySlug).toHaveBeenCalledWith({ faqTypeSlug: 'renamed' });
    expect(mockUpdate).toHaveBeenCalledWith({ faqTypeId: 1, faqTypeSlug: 'renamed' });
    expect(mockInvalidateCache).toHaveBeenCalledWith(['faq-types']);
  });

  it('throws when the FAQ type does not exist', async () => {
    mockFindById.mockResolvedValue(null);

    await expect(updateAdminFaqTypeCommandHandler({ faqTypeId: 99, faqTypeSlug: 'x' }, 'en')).rejects.toThrow();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('rejects a duplicate slug when faqTypeSlug changes', async () => {
    mockFindBySlug.mockResolvedValue({ faqTypeId: 2 } as FaqTypesModel);

    await expect(updateAdminFaqTypeCommandHandler({ faqTypeId: 1, faqTypeSlug: 'taken' }, 'en')).rejects.toThrow();
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
