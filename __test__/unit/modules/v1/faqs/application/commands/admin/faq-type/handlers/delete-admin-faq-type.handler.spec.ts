import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { deleteAdminFaqTypeCommandHandler } from '@/modules/v1/faqs/application/commands/admin/faq-type/handlers/delete-admin-faq-type.handler';

import { deleteAdminFaqTypeRepository, findAdminFaqTypeByIdRepository } from '@/modules/v1/faqs/infrastructure';

const mockInvalidateCache = jest.fn<() => Promise<void>>();
jest.mock('@/shared/v1/domain/contracts', () => ({
  invalidateCache: (...args: unknown[]) => mockInvalidateCache(...(args as [])),
}));

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAdminFaqTypeByIdRepository: jest.fn(),
  deleteAdminFaqTypeRepository: jest.fn(),
}));

const mockFindById = jest.fn<(data: { faqTypeId: number }) => Promise<FaqTypesModel | null>>();
(findAdminFaqTypeByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindById) => void }).mockReturnValue(mockFindById);

const mockDelete = jest.fn<(data: { faqTypeId: number }) => Promise<void>>();
(deleteAdminFaqTypeRepository as unknown as { mockReturnValue: (value: typeof mockDelete) => void }).mockReturnValue(mockDelete);

describe('deleteAdminFaqTypeCommandHandler', () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockDelete.mockReset();
    mockInvalidateCache.mockReset();
    mockInvalidateCache.mockResolvedValue(undefined);
  });

  it('soft-deletes an existing FAQ type and invalidates the cache', async () => {
    mockFindById.mockResolvedValue({ faqTypeId: 1 } as FaqTypesModel);
    mockDelete.mockResolvedValue(undefined);

    await deleteAdminFaqTypeCommandHandler({ faqTypeId: 1 }, 'en');

    expect(mockDelete).toHaveBeenCalledWith({ faqTypeId: 1 });
    expect(mockInvalidateCache).toHaveBeenCalledWith(['faq-types']);
  });

  it('throws when the FAQ type does not exist and never deletes', async () => {
    mockFindById.mockResolvedValue(null);

    await expect(deleteAdminFaqTypeCommandHandler({ faqTypeId: 99 }, 'en')).rejects.toThrow();
    expect(mockDelete).not.toHaveBeenCalled();
    expect(mockInvalidateCache).not.toHaveBeenCalled();
  });
});
