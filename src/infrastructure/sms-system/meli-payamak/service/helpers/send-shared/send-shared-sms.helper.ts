import type { SendSharedSmsFunctionContract } from '@/shared/v1/domain/contracts/sms-system';
import { MeliPayamakEndpoint, type SendSharedSmsRequestDTO, type SendSharedSmsResponseDTO } from '@/infrastructure/sms-system';
import { axiosConfig } from '@/infrastructure/communication-system';
import { EnvValueConfig } from '@/config/env';

export const sendSharedSmsHelper = (): SendSharedSmsFunctionContract => async (smsData: SendSharedSmsRequestDTO) => {
  const response = await axiosConfig.post<unknown, SendSharedSmsResponseDTO, SendSharedSmsRequestDTO>(`${MeliPayamakEndpoint.SHARED_SEND_SMS}/${EnvValueConfig.MELI_PAYAMAK_API_KEY}`, smsData);

  return response;
};
