import express, { Request, Response, Router } from 'express';
import type { CookieOptions } from 'express'; // 1. Import the type
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db'; 

interface JwtPayload {
  id: number;
  username: string;
  role: string;
}

const router: Router = express.Router();

router.get('/test', (req: Request, res: Response) => {
  res.send('This is the analytics route');
});

router.get('/main/:days', async (req: Request, res: Response) => {
  let days = req.params.days;
  try {
    // change to admin token, authorization
    // const token = req.cookies.authToken;    
    // if (!token) {
    //   return res.status(401).json({ message: 'Authentication token is required' });
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string };

    const getMainAnalyticsQuery = `WITH filtered_data AS (SELECT short_code, COUNT(*) AS row_count FROM clicks WHERE timestamp >= current_date - interval '${days} days' GROUP BY short_code) SELECT (SELECT SUM(row_count) FROM filtered_data) AS total_clicks, (SELECT COUNT(short_code) FROM filtered_data) AS distinct_short_codes, (SELECT short_code FROM filtered_data ORDER BY row_count DESC LIMIT 1) AS most_frequent_short_code; `;

    const result = await db.query(getMainAnalyticsQuery);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({
      message: 'Login successful!',
      data: result.rows[0]
    });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }
});

router.get('/url-table/:filter/:order/:page/:wordFilter', async (req: Request, res: Response) => {
  const filter = req.params.filter;
  const order = req.params.order;
  let wordFilter = req.params.wordFilter;
  if (req.params.wordFilter == "none") {
    wordFilter = "";
  }
  console.log(wordFilter);
  const page = req.params.page;
  const pageLimit = 2;
  const offset = (parseInt(page)-1) * pageLimit;
  try {
    // change to admin token, authorization
    // const token = req.cookies.authToken;    
    // if (!token) {
    //   return res.status(401).json({ message: 'Authentication token is required' });
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string };

    const getMainTableQuery = `SELECT date, long_url, urls.short_code, clicks FROM urls LEFT JOIN url_analytics ON urls.short_code = url_analytics.short_code WHERE long_url ILIKE '%${wordFilter}%' ORDER BY ${filter} ${order} LIMIT ${pageLimit} OFFSET ${offset};`;

    const result = await db.query(getMainTableQuery);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Data not found.' });
    }

    return res.status(200).json({
      message: 'Login successful!',
      data: result.rows
    });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }
});

export default router;