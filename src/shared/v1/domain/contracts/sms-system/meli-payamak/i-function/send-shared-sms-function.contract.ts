import type { SendSharedSmsRequestDTO, SendSharedSmsResponseDTO } from '@/infrastructure/sms-system';

export type SendSharedSmsFunctionContract = (_smsData: SendSharedSmsRequestDTO) => Promise<SendSharedSmsResponseDTO>;
