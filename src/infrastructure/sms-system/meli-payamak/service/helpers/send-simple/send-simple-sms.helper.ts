import type { SendSimpleSmsFunctionContract } from '@/shared/v1/domain/contracts/sms-system';
import { MeliPayamakEndpoint, type SendSimpleSmsRequestDTO, type SendSimpleSmsResponseDTO } from '@/infrastructure/sms-system';
import { axiosConfig } from '@/infrastructure/communication-system';
import { EnvValueConfig } from '@/config/env';

export const sendSimpleSmsHelper = (): SendSimpleSmsFunctionContract => async (smsData: SendSimpleSmsRequestDTO) => {
  const response = await axiosConfig.post<unknown, SendSimpleSmsResponseDTO, SendSimpleSmsRequestDTO>(`${MeliPayamakEndpoint.SIMPLE_SEND_SMS}/${EnvValueConfig.MELI_PAYAMAK_API_KEY}`, smsData);

  return response;
};
