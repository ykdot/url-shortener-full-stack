import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db'; 
import { encodeBase64 } from 'bcryptjs';
import encodeToBase62 from '../utils/encoding';
import { redisClient } from '../redis-config';
import { publishMessage } from '../rabbitmq-producer';

const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  let longUrl = await redisClient.get(req.params.id);
  if (!longUrl) {
    const urlQuery = 'SELECT long_url FROM urls WHERE short_code= $1';
    const url = await db.query(urlQuery, [req.params.id]);

    if (url.rowCount > 0) {
      longUrl = url.rows[0]['long_url'];
      await redisClient.set(req.params.id, url.rows[0]['long_url'], {
        EX: 300 // 5 minutes
      });
    }
    else {
      return res.status(404).json({
        message: "not found!"
      }); 
    }   
  }

  const eventData = {
    shortCode: req.params.id,
    timestamp: Date.now().toString(),
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  };
  publishMessage('click', eventData);

  return res.status(200).json({
    message: "success",
    long_url: longUrl,
  }); 
});

router.post('/create-new-url', async (req: Request, res: Response) => {
  const { url } = req.body;
  const createNewUrlQuery = 'INSERT INTO urls (date, user_id, long_url) VALUES ($1, $2, $3) RETURNING id';
  const assignShortCodeQuery = 'UPDATE urls SET short_code=$1 WHERE id=$2';

  try {
    const token = req.cookies.authToken;    

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string };
    const result = await db.query(createNewUrlQuery, ['today', decoded.id, url]);

    if (result.rowCount === 0) {
      return res.status(400).send('Something went wrong');
    }

    const short_code = encodeToBase62(result.rows[0].id);
    const result2 = await db.query(assignShortCodeQuery, [short_code, result.rows[0].id]);

    if (result2.rowCount === 0) {
      return res.status(400).send('Something went wrong');
    }
    
    return res.status(201).json({
      message: 'Successfully created new short_code',
    });
  }catch(err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
});

export default router;