import http from 'http';
import ampq from 'amqplib/callback_api.js';
import { logger } from './logger/logger.js';
import { QUEUE_NAME, SERVER_ADDRESS, PORT } from './config/constant.js';

const server = http.createServer((req, res) => {
  const request = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: []
  };

  req.on('data', (chunk) => {
    request.body.push(chunk);
  });

  req.on('end', () => {
    request.body = Buffer.concat(request.body).toString();

    ampq.connect(SERVER_ADDRESS, (err, conn) => {
      if (err) {
        logger.error(err);
        res.statusCode = 500;
        res.end();  
      };

      conn.createChannel((err, channel) => {
        if (err) {
          logger.error(err);
          res.statusCode = 500;
          res.end();
        }

        channel.assertQueue(QUEUE_NAME, { durable: true });
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(request)), { persistent: true });
        logger.info(`Send request to queue ${QUEUE_NAME}: ${JSON.stringify(request)} `);
        res.statusCode = 202;
        res.end();
      });  


    });
  });

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
