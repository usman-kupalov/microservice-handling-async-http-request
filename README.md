# microservice-handling-async-http-request
This is an example project demonstrating how to use RabbitMQ to implement a microservices architecture in Node.js. 
The project consists of two microservices, M1 and M2, which communicate with each other via a RabbitMQ message queue.


## Installation
To get started, you will need to install Node.js and RabbitMQ. You can download the latest version of Node.js from the official website (https://nodejs.org), 
and RabbitMQ can be downloaded from the official website (https://www.rabbitmq.com).

Once you have Node.js and RabbitMQ installed, you can clone the repository from Github: https://github.com/usman-kupalov/microservice-handling-async-http-request.git
Also install libliary amqplib and pino:
npm install amqplib pino --save

# Usage 
To run the microservices and the RabbitMQ handlers, you will need to open four terminal windows and navigate to the project directory in each of them.
In the first terminal window, start microservice M1:
node M1.js

In the second terminal window, start the RabbitMQ handler for M1:
node M2.js

Once the microservices and the RabbitMQ handlers are running, you can send an HTTP request to microservice M1:
curl -X GET http://localhost:3000

This will trigger a message to be sent to M2 via RabbitMQ, and M2 will respond with a message that is sent back to M1 via RabbitMQ.

# Logging
The microservices and RabbitMQ handlers are configured to use the pino module for logging.
Log messages are output to the console and to a file in JSON format
