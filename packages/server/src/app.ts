import express, { Express, Request, Response } from 'express';
import usersRouter from './routes/users';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express! 👋');
});

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});