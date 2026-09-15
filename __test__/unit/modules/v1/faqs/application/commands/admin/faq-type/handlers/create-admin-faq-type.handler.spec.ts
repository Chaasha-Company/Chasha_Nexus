import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { createAdminFaqTypeCommandHandler } from '@/modules/v1/faqs/application/commands/admin/faq-type/handlers/create-admin-faq-type.handler';

import { createAdminFaqTypeRepository, findAdminFaqTypeBySlugRepository } from '@/modules/v1/faqs/infrastructure';

const mockInvalidateCache = jest.fn<() => Promise<void>>();
jest.mock('@/shared/v1/domain/contracts', () => ({
  invalidateCache: (...args: unknown[]) => mockInvalidateCache(...(args as [])),
}));

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAdminFaqTypeBySlugRepository: jest.fn(),
  createAdminFaqTypeRepository: jest.fn(),
}));

const mockFindBySlug = jest.fn<(data: { faqTypeSlug: string }) => Promise<FaqTypesModel | null>>();
(findAdminFaqTypeBySlugRepository as unknown as { mockReturnValue: (value: typeof mockFindBySlug) => void }).mockReturnValue(mockFindBySlug);

const mockCreate = jest.fn<(data: unknown) => Promise<FaqTypesModel>>();
(createAdminFaqTypeRepository as unknown as { mockReturnValue: (value: typeof mockCreate) => void }).mockReturnValue(mockCreate);

const createdRow = {
  faqTypeId: 1,
  faqTypeNameFa: 'نوع',
  faqTypeNameEn: '',
  faqTypeSlug: 'general',
  faqTypeDescriptionFa: 'توضیح',
  faqTypeDescriptionEn: '',
  faqTypeSortOrder: 0,
  faqTypeIsActive: true,
  faqTypeDeletedAt: null,
  faqTypeCreatedAt: new Date('2026-09-15T00:00:00.000Z'),
  faqTypeUpdatedAt: new Date('2026-09-15T00:00:00.000Z'),
} as unknown as FaqTypesModel;

describe('createAdminFaqTypeCommandHandler', () => {
  beforeEach(() => {
    mockFindBySlug.mockReset();
    mockCreate.mockReset();
    mockInvalidateCache.mockReset();
    mockInvalidateCache.mockResolvedValue(undefined);
    mockFindBySlug.mockResolvedValue(null);
    mockCreate.mockResolvedValue(createdRow);
  });

  it('creates the FAQ type, strips deletedAt, and invalidates the cache', async () => {
    const result = await createAdminFaqTypeCommandHandler(
      {
        faqTypeNameFa: 'نوع',
        faqTypeSlug: 'general',
        faqTypeDescriptionFa: 'توضیح',
      },
      'en',
    );

    expect(mockCreate).toHaveBeenCalled();
    expect(mockInvalidateCache).toHaveBeenCalledWith(['faq-types']);
    expect(result).not.toHaveProperty('faqTypeDeletedAt');
    expect(result.faqTypeSlug).toBe('general');
  });

  it('throws on duplicate slug', async () => {
    mockFindBySlug.mockResolvedValue({ faqTypeId: 2 } as FaqTypesModel);

    await expect(createAdminFaqTypeCommandHandler({ faqTypeNameFa: 'نوع', faqTypeSlug: 'taken', faqTypeDescriptionFa: 'توضیح' }, 'en')).rejects.toThrow();
    expect(mockCreate).not.toHaveBeenCalled();
  });
});
