import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const EXCHANGE_NAME = 'analytics_events';

let channel: amqp.Channel | null = null;

export async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
    console.log('✅ Producer connected to RabbitMQ.');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    process.exit(1);
  }
}

/**
 * Publishes a message to a specific routing key within the main exchange.
 * @param routingKey The key to route the message with (e.g., 'click').
 * @param message The JavaScript object to send as the message.
 */
export function publishMessage(routingKey: string, message: object) {
  if (!channel) {
    throw new Error('RabbitMQ channel is not available. Call connectToRabbitMQ first.');
  }

  // Convert the JS object to a Buffer for sending
  const messageBuffer = Buffer.from(JSON.stringify(message));

  // Publish the message
  channel.publish(EXCHANGE_NAME, routingKey, messageBuffer);
  console.log(`Sent message with routing key '${routingKey}'`);
}