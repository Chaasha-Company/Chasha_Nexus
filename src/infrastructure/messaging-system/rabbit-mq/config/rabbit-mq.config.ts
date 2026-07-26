import amqplib, { type Channel, type ChannelModel } from 'amqplib';
import { EnvValueConfig } from '@/config/env';
import { loggerConfig } from '@/config/logger';

let channel: Channel | null;
let connection: ChannelModel;

export const rabbitMqServerConfig = async (): Promise<Channel | undefined> => {
  if (channel) return channel;
  try {
    connection = await amqplib.connect(EnvValueConfig.RABBITMQ_URL);

    connection.on('close', () => {
      loggerConfig.info('RabbitMq Server Connection Closed');
      channel?.close();
      connection?.close();
    });

    channel = await connection.createChannel();
    await channel.prefetch(1);
    loggerConfig.info('Connected to RabbitMQ - QOS Active');
    return channel;
  } catch (error: unknown) {
    loggerConfig.error(`Testing RabbitMq Connection lost with ${error}`);
  }
};

export const getRabbitMqChannel = async (): Promise<Channel> => {
  if (channel) return channel;
  return (await rabbitMqServerConfig()) as Channel;
};
