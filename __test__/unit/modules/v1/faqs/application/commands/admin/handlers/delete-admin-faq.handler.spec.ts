import type { FaqsModel } from '@/shared/v1/database/schema/faqs';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { deleteAdminFaqCommandHandler } from '@/modules/v1/faqs/application/commands/admin/handlers/delete-admin-faq.handler';

import { deleteAdminFaqRepository, findAdminFaqByIdRepository } from '@/modules/v1/faqs/infrastructure';

const mockInvalidateCache = jest.fn<() => Promise<void>>();
jest.mock('@/shared/v1/domain/contracts', () => ({
  invalidateCache: (...args: unknown[]) => mockInvalidateCache(...(args as [])),
}));

jest.mock('@/modules/v1/faqs/infrastructure', () => ({
  findAdminFaqByIdRepository: jest.fn(),
  deleteAdminFaqRepository: jest.fn(),
}));

const mockFindById = jest.fn<(data: { faqId: number }) => Promise<FaqsModel | null>>();
(findAdminFaqByIdRepository as unknown as { mockReturnValue: (value: typeof mockFindById) => void }).mockReturnValue(mockFindById);

const mockDelete = jest.fn<(data: { faqId: number }) => Promise<void>>();
(deleteAdminFaqRepository as unknown as { mockReturnValue: (value: typeof mockDelete) => void }).mockReturnValue(mockDelete);

describe('deleteAdminFaqCommandHandler', () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockDelete.mockReset();
    mockInvalidateCache.mockReset();
    mockInvalidateCache.mockResolvedValue(undefined);
  });

  it('soft-deletes an existing FAQ and invalidates the cache', async () => {
    mockFindById.mockResolvedValue({ faqId: 1 } as FaqsModel);
    mockDelete.mockResolvedValue(undefined);

    await deleteAdminFaqCommandHandler({ faqId: 1 }, 'en');

    expect(mockDelete).toHaveBeenCalledWith({ faqId: 1 });
    expect(mockInvalidateCache).toHaveBeenCalledWith(['faqs']);
  });

  it('throws when the FAQ does not exist and never deletes', async () => {
    mockFindById.mockResolvedValue(null);

    await expect(deleteAdminFaqCommandHandler({ faqId: 99 }, 'en')).rejects.toThrow();
    expect(mockDelete).not.toHaveBeenCalled();
    expect(mockInvalidateCache).not.toHaveBeenCalled();
  });
});
