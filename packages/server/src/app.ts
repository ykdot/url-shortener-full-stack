import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
const cors = require('cors');
import db from './db'; 
import usersRouter from './routes/users';
import urlRouter from './routes/urls';
import adminRouter from './routes/admin';
import { connectToRabbitMQ, } from './rabbitmq-producer';


const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express! 👋');
});

app.get('/test-db', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await db.query('SELECT NOW()'); // Use the imported query function
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
});

app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/urls', urlRouter);


async function startServer() {
  await connectToRabbitMQ();
  app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
  });
}

startServer();