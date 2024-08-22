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
    const message = 'Hi dad!';

    await channel.assertQueue(queue, { durable: false });
    console.log("Queue asserted!");

    channel.sendToQueue(queue, Buffer.from(message));
    console.log("Message sent!");

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
