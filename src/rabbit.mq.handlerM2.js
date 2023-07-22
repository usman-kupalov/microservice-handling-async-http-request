import ampq from 'amqplib/callback_api.js';
import { logger } from './logger/logger.js';
import { QUEUE_NAME, RESULT_QUEUE_NAME, SERVER_ADDRESS } from './config/constant.js';
import { processTask } from './task.handler.js';

ampq.connect(SERVER_ADDRESS, (err, conn) => {
  if (err) logger.error(err);

  conn.createChannel((err, channel) => {
    channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.prefetch(1);
    logger.info(`Waiting for requests in ${QUEUE_NAME}`);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg.content) {
        const request = JSON.parse(msg.content.toString());

        try {
          const result = await processTask(request);
          logger.info(`Processed task: ${JSON.stringify(request)}`);
          logger.info(`Sending result: ${JSON.stringify(result)}`);

          channel.sendToQueue(RESULT_QUEUE_NAME, Buffer.from(JSON.stringify(result)), { persistent: true });

        } catch (error) {
          logger.error(error);
        } finally {
          channel.ack(msg);
        }
      }
    }, { noAck: false });
  });
});
