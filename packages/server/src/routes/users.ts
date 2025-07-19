import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('This is the users route');
});

router.post('/login', (req: Request, res: Response) => {
  res.send('Logging in process');
}); 



export default router;