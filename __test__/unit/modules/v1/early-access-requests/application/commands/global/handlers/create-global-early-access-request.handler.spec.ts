import type { BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';
import type { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { createGlobalEarlyAccessRequestCommandHandler } from '@/modules/v1/early-access-requests/application/commands/global/handlers/create-global-early-access-request.handler';

import { findBusinessTypeBySlugRepository } from '@/modules/v1/businesses';
import { eventEmitterConfig } from '@/config/emitter';
import { createEarlyAccessRequestRepository, findEarlyAccessRequestByPhoneNumberRepository, findEarlyAccessRequestStatusBySlugRepository, generateChashaEarlyAccessRequestCodeHelper } from '@/modules/v1/early-access-requests/infrastructure';

jest.mock('@/modules/v1/businesses', () => ({
  findBusinessTypeBySlugRepository: jest.fn(),
}));

jest.mock('@/config/emitter', () => ({
  eventEmitterConfig: { emit: jest.fn() },
}));

jest.mock('@/modules/v1/early-access-requests/infrastructure', () => ({
  findBusinessTypeBySlugRepository: jest.fn(),
  createEarlyAccessRequestRepository: jest.fn(),
  findEarlyAccessRequestByPhoneNumberRepository: jest.fn(),
  findEarlyAccessRequestStatusBySlugRepository: jest.fn(),
  generateChashaEarlyAccessRequestCodeHelper: jest.fn(),
}));

const mockFindBusinessType = jest.fn<(data: { businessTypeSlug: string }) => Promise<BusinessTypesModel | null>>();
(findBusinessTypeBySlugRepository as unknown as { mockReturnValue: (value: typeof mockFindBusinessType) => void }).mockReturnValue(mockFindBusinessType);

const mockFindByPhone = jest.fn<(data: { earlyAccessRequestPhoneNumber: string }) => Promise<unknown | null>>();
(findEarlyAccessRequestByPhoneNumberRepository as unknown as { mockReturnValue: (value: typeof mockFindByPhone) => void }).mockReturnValue(mockFindByPhone);

const mockFindPendingStatus = jest.fn<(data: { earlyAccessRequestStatusSlug: string }) => Promise<EarlyAccessRequestStatusesModel | null>>();
(findEarlyAccessRequestStatusBySlugRepository as unknown as { mockReturnValue: (value: typeof mockFindPendingStatus) => void }).mockReturnValue(mockFindPendingStatus);

const mockCreate = jest.fn<(data: Record<string, unknown>) => Promise<{ earlyAccessRequestId: string }>>();
(createEarlyAccessRequestRepository as unknown as { mockReturnValue: (value: typeof mockCreate) => void }).mockReturnValue(mockCreate);

const mockGenerateCode = generateChashaEarlyAccessRequestCodeHelper as unknown as jest.Mock<() => string>;

const mockEmit = eventEmitterConfig.emit as unknown as jest.Mock;

const buildBody = () => ({
  earlyAccessRequestFullName: 'کاربر نمونه',
  earlyAccessRequestPhoneNumber: '+989120000000',
  earlyAccessRequestBusinessName: 'رستوران نمونه',
  earlyAccessRequestBusinessTypeSlug: 'restaurant',
});

describe('createGlobalEarlyAccessRequestCommandHandler', () => {
  beforeEach(() => {
    mockFindBusinessType.mockReset();
    mockFindByPhone.mockReset();
    mockFindPendingStatus.mockReset();
    mockCreate.mockReset();
    mockGenerateCode.mockReset();
    mockEmit.mockReset();

    mockFindBusinessType.mockResolvedValue({ businessTypeId: 3 } as BusinessTypesModel);
    mockFindByPhone.mockResolvedValue(null);
    mockFindPendingStatus.mockResolvedValue({ earlyAccessRequestStatusId: 1 } as EarlyAccessRequestStatusesModel);
    mockGenerateCode.mockReturnValue('EAR-1234');
    mockCreate.mockResolvedValue({ earlyAccessRequestId: 'ear-uuid' });
  });

  it('creates the request with the resolved business type and pending status and returns the code', async () => {
    const result = await createGlobalEarlyAccessRequestCommandHandler(buildBody(), 'en');

    expect(mockFindBusinessType).toHaveBeenCalledWith({ businessTypeSlug: 'restaurant' });
    expect(mockCreate).toHaveBeenCalledWith({
      earlyAccessRequestBusinessTypeId: 3,
      earlyAccessRequestFullName: 'کاربر نمونه',
      earlyAccessRequestPhoneNumber: '+989120000000',
      earlyAccessRequestBusinessName: 'رستوران نمونه',
      earlyAccessRequestStatusId: 1,
      earlyAccessRequestCode: 'EAR-1234',
    });
    expect(result).toEqual({ earlyAccessRequestCode: 'EAR-1234' });
  });

  it('throws a not-found exception when the requested business type slug does not exist', async () => {
    mockFindBusinessType.mockResolvedValue(null);

    await expect(createGlobalEarlyAccessRequestCommandHandler(buildBody(), 'en')).rejects.toMatchObject({ statusCode: 404 });

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('throws a conflict exception and skips creation when the phone number is already registered', async () => {
    mockFindByPhone.mockResolvedValue({ earlyAccessRequestId: 'existing' });

    await expect(createGlobalEarlyAccessRequestCommandHandler(buildBody(), 'en')).rejects.toMatchObject({ statusCode: 409 });

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('emits the early-access-created event with the request phone number after persisting', async () => {
    await createGlobalEarlyAccessRequestCommandHandler(buildBody(), 'en');

    expect(mockEmit).toHaveBeenCalledTimes(1);
    expect(mockEmit.mock.calls[0][1]).toMatchObject({
      earlyAccessRequestPhoneNumber: '+989120000000',
    });
  });
});
