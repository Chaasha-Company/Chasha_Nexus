import type { SendSimpleSmsRequestDTO, SendSimpleSmsResponseDTO } from '@/infrastructure/sms-system';

export type SendSimpleSmsFunctionContract = (_smsData: SendSimpleSmsRequestDTO) => Promise<SendSimpleSmsResponseDTO>;
