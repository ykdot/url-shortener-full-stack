import amqp from 'amqplib';
import db from '../db';

interface ClickEvent {
  shortCode: string;
  timestamp: string;
  ip: string;
  userAgent: string;
}

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const EXCHANGE_NAME = 'analytics_events';
const QUEUE_NAME = 'analytics_db_queue';

async function startWorker(): Promise<void> {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    console.log('Worker connected to RabbitMQ.');

    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, 'click');

    channel.prefetch(1);

    console.log('Waiting for messages to save to the database...');

    channel.consume(QUEUE_NAME, async (msg) => {
      if (!msg) return;
      
      try {
        const clickData: ClickEvent = JSON.parse(msg.content.toString());
        console.log(`Processing database job for: ${clickData.shortCode}`);
        
        console.log('Received timestamp from queue:', clickData.timestamp);

        const insertClickQuery = `
          INSERT INTO clicks (short_code, timestamp, ip_address, user_agent)
          VALUES ($1, $2, $3, $4)
        `;
        const timestampAsDate = new Date(parseInt(clickData.timestamp));

        await db.query(insertClickQuery, [
          clickData.shortCode,
          timestampAsDate,
          clickData.ip,
          clickData.userAgent,
        ]);

        const updateAnalyticsQuery = `
          INSERT INTO url_analytics (short_code, clicks)
          VALUES ($1, 1)
          ON CONFLICT (short_code) 
          DO UPDATE SET clicks = url_analytics.clicks + 1;
        `;
        await db.query(updateAnalyticsQuery, [clickData.shortCode]);

        channel.ack(msg);

        console.log(`Successfully saved analytics for ${clickData.shortCode}`);

      } catch (error) {
        console.error('Error processing message:', error);
        channel.nack(msg, false, false);
      }
    });

  } catch (err) {
    console.error('Worker failed to start:', err);
    process.exit(1);
  }
}

startWorker();