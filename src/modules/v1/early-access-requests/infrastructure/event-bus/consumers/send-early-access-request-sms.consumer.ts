import type { SendEarlyAccessRequestSmsEventData } from '@/modules/v1/early-access-requests/domain';
import { eventEmitterConfig } from '@/config/emitter';
import { loggerConfig } from '@/config/logger';
import { EventName } from '@/shared/v1/enums/event-name';
import { sendSharedSmsHelper } from '@/infrastructure/sms-system';

eventEmitterConfig.on(EventName.EARLY_ACCESS_REQUEST_CREATED, async (createEarlyAccessData: SendEarlyAccessRequestSmsEventData) => {
  try {
    const smsApiResponse = await sendSharedSmsHelper()({
      args: createEarlyAccessData.earlyAccessRequestSmsParameters,
      bodyId: createEarlyAccessData.earlyAccessRequestPatternCode,
      to: createEarlyAccessData.earlyAccessRequestPhoneNumber,
    });
    loggerConfig.info(`Counsel Request Sms Called  -> ${createEarlyAccessData.earlyAccessRequestPhoneNumber} \n
    with ${smsApiResponse.recId} REC ID
  `);
  } catch (error: unknown) {
    loggerConfig.error(`Error processing Early Access Request SMS event: ${error}`);
  }
});
