import express, { Request, Response, Router } from 'express';
import db from '../db'; 

const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  const urlQuery = 'SELECT long_url FROM urls WHERE short_code= $1';
  const url = await db.query(urlQuery, [req.params.id]);
  console.log(url);

  if (url.rowCount > 0) {
    return res.status(200).json({
      message: "success",
      long_url: url.rows[0]['long_url'],
    });    
  }
  else {
    return res.status(404).json({
      message: "not found!"
    }); 
  }
});

export default router;