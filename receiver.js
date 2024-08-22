import { connect } from 'amqplib';

(async () => {
  try {
    console.log("Connecting to RabbitMQ...");
    const connection = await connect('amqp://localhost');
    console.log("Connected to RabbitMQ!");

    console.log("Creating channel...");
    const channel = await connection.createChannel();
    console.log("Channel created!");

    const queue = 'messages';

    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for messages in queue: ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log("Received:", msg.content.toString());
        channel.ack(msg);
      }
    }, {
      noAck: false
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
